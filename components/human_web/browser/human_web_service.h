/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_HUMAN_WEB_BROWSER_HUMAN_WEB_SERVICE_H_
#define BRAVE_COMPONENTS_HUMAN_WEB_BROWSER_HUMAN_WEB_SERVICE_H_

class PrefRegistrySimple;

namespace human_web {

void RegisterLocalStatePrefs(PrefRegistrySimple* registry);

}  // namespace human_web
#endif  // BRAVE_COMPONENTS_HUMAN_WEB_BROWSER_HUMAN_WEB_SERVICE_H_
