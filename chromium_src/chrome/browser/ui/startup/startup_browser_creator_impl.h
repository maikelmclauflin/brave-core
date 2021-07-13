/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_CHROMIUM_SRC_CHROME_BROWSER_UI_STARTUP_STARTUP_BROWSER_CREATOR_IMPL_H_
#define BRAVE_CHROMIUM_SRC_CHROME_BROWSER_UI_STARTUP_STARTUP_BROWSER_CREATOR_IMPL_H_

#include "../../../../../../chrome/browser/ui/startup/startup_browser_creator_impl.h"

// Declare our subclass with the overridden method.
class BraveStartupBrowserCreatorImpl final : public StartupBrowserCreatorImpl {
  public:
    bool Launch(Profile* profile,
                const std::vector<GURL>& urls_to_open,
                bool process_startup,
                std::unique_ptr<LaunchModeRecorder> launch_mode_recorder);
};

#endif  // BRAVE_CHROMIUM_SRC_CHROME_BROWSER_UI_STARTUP_STARTUP_BROWSER_CREATOR_IMPL_H_
