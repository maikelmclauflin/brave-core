/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/browser/extensions/api/brave_human_web_api.h"
#include "base/values.h"
#include "brave/common/pref_names.h"
#include "chrome/browser/browser_process.h"
#include "components/prefs/pref_service.h"

namespace extensions {
namespace api {

BraveHumanWebGetEnabledFunction::~BraveHumanWebGetEnabledFunction() = default;

ExtensionFunction::ResponseAction BraveHumanWebGetEnabledFunction::Run() {
  PrefService* local_state = g_browser_process->local_state();
  const bool enabled = local_state->GetBoolean(kBraveHumanWebEnabled);
  return RespondNow(OneArgument(base::Value(enabled)));
}

}  // namespace api
}  // namespace extensions
