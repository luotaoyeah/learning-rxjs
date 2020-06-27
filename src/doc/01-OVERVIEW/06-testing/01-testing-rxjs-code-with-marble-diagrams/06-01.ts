/*
 * Overview
 *     Testing
 */

import chalk from 'chalk';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * rxjs 提供了 TestScheduler 用来测试 rxjs,
   * 它只能用来测试基于 AsyncScheduler 的代码,
   * 它不能用来测试基于 AsapScheduler/AnimationFrameScheduler 和 Promise 的代码
   */
}
