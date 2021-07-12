/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_WALLET_BROWSER_WALLET_DATA_FILES_UPDATER_H_
#define BRAVE_COMPONENTS_BRAVE_WALLET_BROWSER_WALLET_DATA_FILES_UPDATER_H_

#include <memory>
#include <string>

#include "base/files/file_path.h"
#include "base/memory/weak_ptr.h"
#include "base/observer_list.h"
#include "base/scoped_observation.h"
#include "base/sequenced_task_runner.h"
#include "brave/components/brave_component_updater/browser/brave_component.h"
#include "components/component_updater/component_updater_service.h"

class WalletDataFilesUpdaterTest;

using brave_component_updater::BraveComponent;

namespace brave_wallet {

static const char kWalletDataFilesComponentName[] = "Brave Wallet Data Files";
static const char kWalletDataFilesComponentId[] =
    "bbckkcdiepaecefgfnibemejliemjnio";

static const char kWalletDataFilesComponentBase64PublicKey[] =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArxxr39YT+hk6Fo1KEDTe"
    "77Vt/ZXr9+b4fKWpltg37Im7HD9TWYg6O7IFmGe19lh+4SPdojB1Fx3b0EVBfKqH"
    "RWZz9idqFskUOicOV87BKWp+Q8qiZ5On7a70QeKNBCUAhk/t1ykBzlUm7Mk6kuka"
    "IxZmKmY/7czU+W86VG9UpKcX16ANyYRr7zX0alt31PURboEoarnBINmJsT14TsZz"
    "i8CW/LJmS5krLO2sPch0Gwt45ogb/1OukuPkwS8wohtJ48byUKu/E+pHbiQ1XGVq"
    "3zjL3SVON68DpJdHPEXcPGpOAHCjqu/e0WyJUKf93koaw7b4yZSvu6QJi846OjRV"
    "GQIDAQAB";

class WalletDataFilesUpdater : public BraveComponent,
                               public BraveComponent::ComponentObserver {
 public:
  class Observer : public base::CheckedObserver {
   public:
    virtual void OnWalletDataReady(const base::FilePath& path) = 0;

   protected:
    ~Observer() override = default;
  };

  WalletDataFilesUpdater(BraveComponent::Delegate* delegate,
                         const base::FilePath& user_data_dir);
  ~WalletDataFilesUpdater() override;

  void Register();
  base::FilePath GetExecutablePath() const;
  scoped_refptr<base::SequencedTaskRunner> GetTaskRunner() {
    return task_runner_;
  }

  bool IsRegistered() const { return registered_; }

  void AddObserver(Observer* observer);
  void RemoveObserver(Observer* observer);
  void Cleanup();

 protected:
  void OnComponentReady(const std::string& component_id,
                        const base::FilePath& install_dir,
                        const std::string& manifest) override;

  // BraveComponent::ComponentObserver
  void OnEvent(Events event, const std::string& id) override;

 private:
  friend class ::WalletDataFilesUpdaterTest;
  static std::string g_wallet_data_files_component_name_;
  static std::string g_wallet_data_files_component_id_;
  static std::string g_wallet_data_files_component_base64_public_key_;
  static void SetComponentIdAndBase64PublicKeyForTest(
      const std::string& component_id,
      const std::string& component_base64_public_key);
  void SetPath(const base::FilePath& path);

  scoped_refptr<base::SequencedTaskRunner> task_runner_;
  bool registered_;
  base::FilePath user_data_dir_;
  base::FilePath executable_path_;
  base::ObserverList<Observer> observers_;
  base::ScopedObservation<BraveComponent, BraveComponent::ComponentObserver>
      updater_observer_{this};

  base::WeakPtrFactory<WalletDataFilesUpdater> weak_ptr_factory_;

  DISALLOW_COPY_AND_ASSIGN(WalletDataFilesUpdater);
};

// Creates the WalletDataFilesUpdater
std::unique_ptr<WalletDataFilesUpdater> WalletDataFilesUpdaterFactory(
    BraveComponent::Delegate* delegate,
    const base::FilePath& user_data_dir);

}  // namespace brave_wallet

#endif  // BRAVE_COMPONENTS_BRAVE_WALLET_BROWSER_WALLET_DATA_FILES_UPDATER_H_
