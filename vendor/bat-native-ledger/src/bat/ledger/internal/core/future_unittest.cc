/* Copyright (c) 2021 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "bat/ledger/internal/core/future.h"
#include "base/test/bind.h"
#include "base/test/task_environment.h"
#include "testing/gtest/include/gtest/gtest.h"

namespace ledger {

class FutureTest : public testing::Test {
 protected:
  base::test::TaskEnvironment task_environment_;
};

TEST_F(FutureTest, CompleteResultSentInFutureTurn) {
  Future<int>::Resolver resolver;
  resolver.Complete(10);
  int value = 0;
  resolver.future().Then(
      base::BindLambdaForTesting([&value](int v) { value = v; }));
  ASSERT_EQ(value, 0);
  task_environment_.RunUntilIdle();
  ASSERT_EQ(value, 10);
}

TEST_F(FutureTest, CompleteCallbacksExecutedInFutureTurn) {
  Future<int>::Resolver resolver;
  int value = 0;
  resolver.future().Then(
      base::BindLambdaForTesting([&value](int v) { value = v; }));
  resolver.Complete(1);
  ASSERT_EQ(value, 0);
  task_environment_.RunUntilIdle();
  ASSERT_EQ(value, 1);
}

TEST_F(FutureTest, FirstListenerWins) {
  bool call1 = false;
  bool call2 = false;
  bool call3 = false;

  Future<int>::Resolver resolver;
  resolver.future().Then(
      base::BindLambdaForTesting([&call1](int) { call1 = true; }));
  resolver.future().Then(
      base::BindLambdaForTesting([&call2](int) { call2 = true; }));

  // Wait for listener registration tasks
  task_environment_.RunUntilIdle();
  resolver.Complete(1);

  // Wait for listeners to be called
  task_environment_.RunUntilIdle();

  EXPECT_TRUE(call1);
  EXPECT_FALSE(call2);

  resolver.future().Then(
      base::BindLambdaForTesting([&call3](int) { call3 = true; }));

  task_environment_.RunUntilIdle();
  EXPECT_FALSE(call3);
}

TEST_F(FutureTest, ThenMapping) {
  Future<int>::Resolver resolver;
  double value = 0;
  resolver.future()
      .Then(base::BindOnce([](int v) { return static_cast<double>(v) / 2; }))
      .Then(base::BindLambdaForTesting([&value](double v) { value = v; }));

  resolver.Complete(1);
  ASSERT_EQ(value, 0);
  task_environment_.RunUntilIdle();
  ASSERT_EQ(value, 0.5);
}

TEST_F(FutureTest, Completed) {
  int value = 0;
  Future<int>::Completed(1).Then(
      base::BindLambdaForTesting([&value](int v) { value = v; }));
  ASSERT_EQ(value, 0);
  task_environment_.RunUntilIdle();
  ASSERT_EQ(value, 1);
}

}  // namespace ledger
