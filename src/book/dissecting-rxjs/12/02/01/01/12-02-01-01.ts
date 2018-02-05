/*
 * 12.2.5 操纵时间的 TestScheduler
 *     1. 弹珠测试
 */

import chalk from "chalk";

function fn01() {
  console.log(
    chalk.red("\n-------------------------------------------------- 02"),
  );
  {
    /*
     * rxjs 提供了 TestScheduler 用来对 rxjs 进行测试,
     * 由于 TestScheduler 是继承自 AsyncScheduler,
     * 因此只能对基于 AsyncScheduler 的 observable 进行测试
     */
  }
}

export { fn01 };
