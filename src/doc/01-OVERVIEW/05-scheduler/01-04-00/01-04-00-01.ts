/*
 * Overview
 *     Scheduler
 */

import chalk from "chalk";
import { asyncScheduler, Observable, Subscriber } from "rxjs";
import { observeOn } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * scheduler 是用来控制：什么时候 start subscription，什么时候 deliver notification，
   * scheduler 是一种 data structure，负责对 task 进行存储和排队
   * scheduler 是一种 execution context，控制如何执行一个 task
   * scheduler 有自己的 virtual clock
   */

  /*
   * 如下使用了 asyncScheduler，将任务放到 macrotask 队列中执行，
   * 因此，observable 的数据推送就变成异步的了
   */
  const observable: Observable<number> = new Observable<number>(
    (subscriber: Subscriber<number>) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    },
  ).pipe(observeOn(asyncScheduler));

  console.log(chalk.red("BEFORE"));

  observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  console.log(chalk.red("AFTER"));
}
