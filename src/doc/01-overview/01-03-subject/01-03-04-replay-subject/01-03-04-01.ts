/*
 * Overview
 *     Subject
 *         Multicasted Observables
 *             ReplaySubject
 */

import chalk from "chalk";
import { ReplaySubject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * ReplaySubject is similar to BehaviorSubject, the difference is:
   *     BehaviorSubject 只记录最近的 1 个数据，
   *     ReplaySubject 可以指定需要记录最近的 n 个数据
   * 当有新的 observer 注册进来时，这 n 个数据都会推送给这个新的 observer
   */

  const subject: ReplaySubject<number> = new ReplaySubject<number>(2);

  subject.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);

  subject.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  subject.next(5);
}
