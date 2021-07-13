/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include <string>
#include <vector>

#include "brave/components/brave_wallet/browser/asset_ratio_controller.h"
#include "brave/components/brave_wallet/browser/brave_wallet_constants.h"
#include "brave/components/brave_wallet/browser/brave_wallet_service.h"
#include "brave/components/brave_wallet/browser/brave_wallet_utils.h"
#include "brave/components/brave_wallet/browser/eth_json_rpc_controller.h"
#include "brave/components/brave_wallet/browser/eth_tx_controller.h"
#include "brave/components/brave_wallet/browser/keyring_controller.h"
#include "brave/components/brave_wallet/browser/pref_names.h"
#include "brave/components/brave_wallet/browser/swap_controller.h"
#include "components/prefs/pref_registry_simple.h"
#include "components/prefs/pref_service.h"
#include "services/network/public/cpp/shared_url_loader_factory.h"

namespace brave_wallet {

BraveWalletService::BraveWalletService(
    PrefService* prefs,
    brave_wallet::WalletDataFilesUpdater* wallet_data_files_updater,
    scoped_refptr<network::SharedURLLoaderFactory> url_loader_factory)
    : prefs_(prefs), wallet_data_files_updater_(wallet_data_files_updater) {
  rpc_controller_ = std::make_unique<brave_wallet::EthJsonRpcController>(
      brave_wallet::Network::kMainnet, url_loader_factory);
  keyring_controller_ =
      std::make_unique<brave_wallet::KeyringController>(prefs);
  tx_controller_ = std::make_unique<brave_wallet::EthTxController>(
      base::AsWeakPtr(this), prefs);
  asset_ratio_controller_ =
      std::make_unique<brave_wallet::AssetRatioController>(url_loader_factory);
  swap_controller_ =
      std::make_unique<brave_wallet::SwapController>(url_loader_factory);
  RegisterWalletDataFilesUpdater();
}

BraveWalletService::~BraveWalletService() {}

void BraveWalletService::RegisterProfilePrefs(PrefRegistrySimple* registry) {
  registry->RegisterIntegerPref(
      kBraveWalletWeb3Provider,
      static_cast<int>(brave_wallet::IsNativeWalletEnabled()
                           ? brave_wallet::Web3ProviderTypes::BRAVE_WALLET
                           : brave_wallet::Web3ProviderTypes::ASK));
  registry->RegisterStringPref(kBraveWalletPasswordEncryptorSalt, "");
  registry->RegisterStringPref(kBraveWalletPasswordEncryptorNonce, "");
  registry->RegisterStringPref(kBraveWalletEncryptedMnemonic, "");
  registry->RegisterIntegerPref(kBraveWalletDefaultKeyringAccountNum, 0);
  registry->RegisterDictionaryPref(kBraveWalletTransactions);
  registry->RegisterBooleanPref(kShowWalletIconOnToolbar, true);
  registry->RegisterBooleanPref(kBraveWalletBackupComplete, false);
  registry->RegisterTimePref(kBraveWalletLastUnlockTime, base::Time());
  registry->RegisterListPref(kBraveWalletAccountNames);
}

brave_wallet::EthJsonRpcController* BraveWalletService::rpc_controller() const {
  return rpc_controller_.get();
}

brave_wallet::KeyringController* BraveWalletService::keyring_controller()
    const {
  return keyring_controller_.get();
}
brave_wallet::EthTxController* BraveWalletService::tx_controller() const {
  return tx_controller_.get();
}

brave_wallet::AssetRatioController* BraveWalletService::asset_ratio_controller()
    const {
  return asset_ratio_controller_.get();
}

brave_wallet::SwapController* BraveWalletService::swap_controller() const {
  return swap_controller_.get();
}

std::vector<std::string> BraveWalletService::WalletAccountNames() const {
  std::vector<std::string> account_names;
  for (const auto& account_name_value :
       prefs_->Get(kBraveWalletAccountNames)->GetList()) {
    const std::string* account_name = account_name_value.GetIfString();
    DCHECK(account_name) << "account name type should be string";
    account_names.push_back(*account_name);
  }
  return account_names;
}

// TODO(Douglas): This need to be seperated into 2 separate methods
// 1. SetInitialAccountName to set the initial account name/names
// 2. AddNewAccountName to use ListPrefUpdate to add a new account name to the
// bottom of list
void BraveWalletService::UpdateAccountNames(
    const std::vector<std::string>& account_names) {
  std::vector<base::Value> account_names_list;
  for (const std::string& name : account_names) {
    account_names_list.push_back(base::Value(name));
  }
  prefs_->Set(kBraveWalletAccountNames, base::Value(account_names_list));
}

bool BraveWalletService::IsWalletBackedUp() const {
  return prefs_->GetBoolean(kBraveWalletBackupComplete);
}

void BraveWalletService::NotifyWalletBackupComplete() {
  prefs_->SetBoolean(kBraveWalletBackupComplete, true);
}

void BraveWalletService::RegisterWalletDataFilesUpdater() {
  if (wallet_data_files_updater_) {
    wallet_data_files_updater_->Register();
  }
}

void BraveWalletService::OnWalletDataReady(const base::FilePath& path) {
  if (path.empty())
    return;

  LOG(ERROR) << "BraveWalletService::OnWalletDataReady";
}

}  // namespace brave_wallet
