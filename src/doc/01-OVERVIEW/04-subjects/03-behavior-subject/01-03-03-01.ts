/*
 * Overview
 *     Subject
 *         BehaviorSubject
 */

import chalk from "chalk";
import { BehaviorSubject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * BehaviorSubject 是一种特殊的 Subject，它的特点是：
   * 它会记录最后一次填充的数据，称之为 current value，当有新的 observer 注册进来时，
   * 这个新的 observer 会马上接收到这个 current value，
   * 即使这个 current value 是在这个 observer 注册之前填充进来的
   */

  /*
   * 创建 BehaviorSubject 对象时，需要提供一个初始的 current value
   */
  const subject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  subject.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subject.next(1);
  subject.next(2);

  /*
   * 此时 subject 的 current value 为 2，
   * 当新的 observer 注册进来时，会立即接收到这个 2
   */
  subject.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  subject.next(3);
}
