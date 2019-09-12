/* Copyright 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_SHIELDS_BROWSER_ADBLOCK_STUB_RESPONSE_H_
#define BRAVE_COMPONENTS_BRAVE_SHIELDS_BROWSER_ADBLOCK_STUB_RESPONSE_H_

#include <string>

namespace network {
struct ResourceResponseHead;
struct ResourceRequest;
}

namespace brave_shields {

// Intercepts certain requests and blocks them by silently returning 200 OK
// and not allowing them to hit the network.
void MakeStubResponse(const std::string& redirect,
                      const network::ResourceRequest& request,
                      network::ResourceResponseHead* response,
                      std::string* data);

}  // namespace brave_shields

#endif  // BRAVE_COMPONENTS_BRAVE_SHIELDS_BROWSER_ADBLOCK_STUB_RESPONSE_H_
