/*
 * API
 *     takeUntil
 */

import chalk from "chalk";
import { interval, Observable, Subscriber } from "rxjs";
import { takeUntil } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * takeUntil() 接收一个参数 notifier observable，
   * 表示从 source observable 一直往 output observable 推送数据，
   * 一直到 notifier observable 推送了它的第一个数据为止
   */

  const notifier: Observable<number> = new Observable(
    (subscriber: Subscriber<number>) => {
      setTimeout(() => {
        subscriber.next(0);
        subscriber.complete();
      }, 5000);
    },
  );

  interval(1000)
    .pipe(takeUntil<number>(notifier))
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
