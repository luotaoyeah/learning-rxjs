/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Executing Observables
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 通常可以在 subscribe 函数中，通过 try/catch 捕获异常，
   * 然后通过 subscriber.error() 方法，将错误抛出去
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    try {
      subscriber.next(1);
      subscriber.next(2);

      /* 抛出一个异常 */
      JSON.parse("");

      subscriber.next(3);
      subscriber.complete();
    } catch (e) {
      subscriber.error(e);
    }
  });

  observable.subscribe(
    (value: number) => {
      console.log(chalk.red(value.toString()));
    },
    (error: Error) => {
      console.log(chalk.grey.bgRed(error.message));
    },
  );
}
