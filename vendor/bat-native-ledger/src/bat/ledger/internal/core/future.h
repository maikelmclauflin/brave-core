/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_VENDOR_BAT_NATIVE_LEDGER_SRC_BAT_LEDGER_INTERNAL_CORE_FUTURE_H_
#define BRAVE_VENDOR_BAT_NATIVE_LEDGER_SRC_BAT_LEDGER_INTERNAL_CORE_FUTURE_H_

#include <list>
#include <type_traits>
#include <utility>

#include "base/callback.h"
#include "base/memory/ref_counted.h"
#include "base/memory/scoped_refptr.h"
#include "base/threading/sequenced_task_runner_handle.h"
#include "third_party/abseil-cpp/absl/types/optional.h"

namespace ledger {

// Represents the result of an asynchronous operation.
//
// Example:
//   Future<int>::Resolver resolver;
//   resolver.Complete(42);
//
//   Future<int> result = resolver.result();
//   result.Then(base::BindOnce([](int value) {}));
//
// Listeners are called on the current SequencedTaskRunner, and are guaranteed
// to be called asynchronously. Future and Resolver objects are internally
// reference counted and can be passed between sequences; the internal data
// structures are updated on the sequence that created the Resolver.
template <typename T>
class Future {
  static_assert(!std::is_reference<T>::value && !std::is_pointer<T>::value,
                "Future<T> is not supported for pointer or reference types");

 public:
  using CompleteType = T;
  using CompleteCallback = base::OnceCallback<void(T)>;

  template <typename U>
  using MapCompleteCallback = base::OnceCallback<U(T)>;

  void Then(CompleteCallback on_complete) {
    Listener listener = {.on_complete = std::move(on_complete),
                         .task_runner = base::SequencedTaskRunnerHandle::Get()};

    task_runner_->PostTask(FROM_HERE, base::BindOnce(AddListenerInTask, store_,
                                                     std::move(listener)));
  }

  template <typename U>
  Future<U> Then(MapCompleteCallback<U> map_complete) {
    typename Future<U>::Resolver resolver;
    Then(base::BindOnce(ThenCompleteCallback<U>, resolver,
                        std::move(map_complete)));
    return resolver.future();
  }

  static Future Completed(T value) {
    Resolver resolver;
    resolver.Complete(std::move(value));
    return resolver.future();
  }

  class Resolver {
   public:
    Resolver() {}
    void Complete(T value) { future_.Complete(std::move(value)); }
    Future future() const { return future_; }

   private:
    Future future_;
  };

 private:
  Future()
      : store_(new Store()),
        task_runner_(base::SequencedTaskRunnerHandle::Get()) {}

  enum class State { kPending, kComplete, kEmpty };

  struct Listener {
    CompleteCallback on_complete;
    scoped_refptr<base::SequencedTaskRunner> task_runner;
  };

  struct Store : public base::RefCountedThreadSafe<Store> {
    Store() {}
    State state = State::kPending;
    absl::optional<T> value;
    absl::optional<Listener> listener;
  };

  void Complete(T&& value) {
    task_runner_->PostTask(
        FROM_HERE, base::BindOnce(SetCompleteInTask, store_, std::move(value)));
  }

  template <typename U>
  static void ThenCompleteCallback(typename Future<U>::Resolver resolver,
                                   MapCompleteCallback<U> map_complete,
                                   T value) {
    resolver.Complete(std::move(map_complete).Run(std::move(value)));
  }

  static void AddListenerInTask(scoped_refptr<Store> store, Listener listener) {
    switch (store->state) {
      case State::kComplete:
        store->state = State::kEmpty;
        DCHECK(store->value);
        listener.task_runner->PostTask(
            FROM_HERE,
            base::BindOnce(RunCompleteCallback, std::move(*store->value),
                           std::move(listener.on_complete)));
        break;
      case State::kPending:
        if (!store->listener)
          store->listener = std::move(listener);
        break;
      case State::kEmpty:
        break;
    }
  }

  static void SetCompleteInTask(scoped_refptr<Store> store, T value) {
    if (store->state != State::kPending)
      return;

    store->state = State::kComplete;
    store->value = std::move(value);

    if (store->listener) {
      store->state = State::kEmpty;
      Listener listener = std::move(*store->listener);
      listener.task_runner->PostTask(
          FROM_HERE,
          base::BindOnce(RunCompleteCallback, std::move(*store->value),
                         std::move(listener.on_complete)));
    }
  }

  static void RunCompleteCallback(T value, CompleteCallback on_complete) {
    std::move(on_complete).Run(std::move(value));
  }

  scoped_refptr<Store> store_;
  scoped_refptr<base::SequencedTaskRunner> task_runner_;
};

}  // namespace ledger

#endif  // BRAVE_VENDOR_BAT_NATIVE_LEDGER_SRC_BAT_LEDGER_INTERNAL_CORE_FUTURE_H_
