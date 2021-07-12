/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/components/brave_wallet/browser/wallet_data_files_updater.h"

#include "base/files/file_enumerator.h"
#include "base/files/file_path.h"
#include "base/files/file_util.h"
#include "base/logging.h"
#include "base/task/post_task.h"
#include "base/task/thread_pool.h"
#include "base/task_runner.h"
#include "base/task_runner_util.h"
#include "components/component_updater/component_updater_service.h"

namespace brave_wallet {

std::string WalletDataFilesUpdater::g_wallet_data_files_component_id_(
    kWalletDataFilesComponentId);
std::string
    WalletDataFilesUpdater::g_wallet_data_files_component_base64_public_key_(
        kWalletDataFilesComponentBase64PublicKey);

WalletDataFilesUpdater::WalletDataFilesUpdater(
    BraveComponent::Delegate* delegate,
    const base::FilePath& user_data_dir)
    : BraveComponent(delegate),
      task_runner_(
          base::ThreadPool::CreateSequencedTaskRunner({base::MayBlock()})),
      registered_(false),
      user_data_dir_(user_data_dir),
      weak_ptr_factory_(this) {}

WalletDataFilesUpdater::~WalletDataFilesUpdater() {}

void WalletDataFilesUpdater::Register() {
  if (registered_)
    return;

  BraveComponent::Register(kWalletDataFilesComponentName,
                           g_wallet_data_files_component_id_,
                           g_wallet_data_files_component_base64_public_key_);
  if (!updater_observer_.IsObservingSource(this))
    updater_observer_.Observe(this);
  registered_ = true;
}

namespace {

base::FilePath InitPath(const base::FilePath& install_dir) {
  base::FilePath executable_path;
  LOG(ERROR) << "===InitPath called===== install_dir: " << install_dir;
  return base::FilePath();
}

void DeleteDir(const base::FilePath& path) {
  base::DeletePathRecursively(path);
}

}  // namespace

void WalletDataFilesUpdater::SetPath(const base::FilePath& path) {
  executable_path_ = path;
  for (Observer& observer : observers_)
    observer.OnWalletDataReady(path);
}

base::FilePath WalletDataFilesUpdater::GetExecutablePath() const {
  return executable_path_;
}

void WalletDataFilesUpdater::OnEvent(Events event, const std::string& id) {
  if (id != kWalletDataFilesComponentId)
    return;
  if (event == Events::COMPONENT_UPDATE_ERROR) {
    registered_ = false;
  }
}

void WalletDataFilesUpdater::OnComponentReady(const std::string& component_id,
                                              const base::FilePath& install_dir,
                                              const std::string& manifest) {
  base::PostTaskAndReplyWithResult(
      GetTaskRunner().get(), FROM_HERE, base::BindOnce(&InitPath, install_dir),
      base::BindOnce(&WalletDataFilesUpdater::SetPath,
                     weak_ptr_factory_.GetWeakPtr()));
}

void WalletDataFilesUpdater::AddObserver(Observer* observer) {
  observers_.AddObserver(observer);
}

void WalletDataFilesUpdater::RemoveObserver(Observer* observer) {
  observers_.RemoveObserver(observer);
}

void WalletDataFilesUpdater::Cleanup() {
  DCHECK(!user_data_dir_.empty());
  base::FilePath ipfs_component_dir =
      user_data_dir_.AppendASCII(kWalletDataFilesComponentId);
  task_runner_->PostTask(FROM_HERE,
                         base::BindOnce(&DeleteDir, ipfs_component_dir));
}

// static
void WalletDataFilesUpdater::SetComponentIdAndBase64PublicKeyForTest(
    const std::string& component_id,
    const std::string& component_base64_public_key) {
  g_wallet_data_files_component_id_ = component_id;
  g_wallet_data_files_component_base64_public_key_ =
      component_base64_public_key;
}

///////////////////////////////////////////////////////////////////////////////

// The Brave Ipfs client extension factory.
std::unique_ptr<WalletDataFilesUpdater> WalletDataFilesUpdaterFactory(
    BraveComponent::Delegate* delegate,
    const base::FilePath& user_data_dir) {
  return std::make_unique<WalletDataFilesUpdater>(delegate, user_data_dir);
}

}  // namespace brave_wallet
