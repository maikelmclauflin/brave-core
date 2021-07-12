/* Copyright 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/components/debounce/browser/debounce_throttle.h"

#include <memory>

#include "base/feature_list.h"
#include "brave/components/brave_shields/browser/brave_shields_util.h"
#include "brave/components/debounce/browser/debounce_service.h"
#include "brave/components/debounce/common/features.h"
#include "components/content_settings/core/browser/host_content_settings_map.h"
#include "services/network/public/cpp/request_mode.h"
#include "services/network/public/cpp/resource_request.h"
#include "url/gurl.h"

namespace debounce {

// static
std::unique_ptr<DebounceThrottle> DebounceThrottle::MaybeCreateThrottleFor(
    DebounceService* debounce_service,
    HostContentSettingsMap* host_content_settings_map) {
  // If debouncing is disabled in brave://flags, don't create throttle. Caller
  // must nullcheck this.
  if (!base::FeatureList::IsEnabled(debounce::features::kBraveDebounce))
    return nullptr;
  return std::make_unique<DebounceThrottle>(debounce_service,
                                            host_content_settings_map);
}

DebounceThrottle::DebounceThrottle(
    DebounceService* debounce_service,
    HostContentSettingsMap* host_content_settings_map)
    : debounce_service_(debounce_service),
      host_content_settings_map_(host_content_settings_map) {}

DebounceThrottle::~DebounceThrottle() = default;

void DebounceThrottle::WillStartRequest(network::ResourceRequest* request,
                                        bool* defer) {
  if (!brave_shields::ShouldDoDebouncing(host_content_settings_map_,
                                         request->url))
    return;

  GURL debounced_url;

  // Call debounce service to try to debounce this URL based on available rules.
  // Returns false if no rules apply.
  if (!debounce_service_->Debounce(request->url, request->site_for_cookies,
                                   &debounced_url))
    return;

  VLOG(1) << "Debouncing rule applied: " << request->url << " -> "
          << debounced_url;
  request->url = debounced_url;

  // Check if we're debouncing to a different site (where "different" is defined
  // as "has different first-party cookies"). If so, we need to reinitialize
  // the trusted params for the new origin and restart the request.
  if (!request->site_for_cookies.IsEquivalent(
          net::SiteForCookies::FromUrl(debounced_url))) {
    url::Origin debounced_site_for_cookies_origin =
        url::Origin::Create(debounced_url);
    request->request_initiator = debounced_site_for_cookies_origin;
    request->trusted_params = network::ResourceRequest::TrustedParams();
    request->trusted_params->isolation_info = net::IsolationInfo::Create(
        net::IsolationInfo::RequestType::kOther,
        debounced_site_for_cookies_origin, debounced_site_for_cookies_origin,
        net::SiteForCookies::FromOrigin(debounced_site_for_cookies_origin));
  }
  delegate_->RestartWithFlags(/* additional_load_flags */ 0);
}

}  // namespace debounce
