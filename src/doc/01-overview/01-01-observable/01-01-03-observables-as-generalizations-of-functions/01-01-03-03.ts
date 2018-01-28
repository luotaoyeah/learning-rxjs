/*
 * Overview
 *     Observable
 *         Observables as Generalizations Of Functions
 *             Observable Can Deliver Values Either Synchronously Or Asynchronously
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 普通的 function 只能同步返回一个数据，
   * 而 observable 可以同步或者异步返回一个或者多个数据
   */

  /*
   * 如下，observable 可以同步返回多个数据
   */
  const observable = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  });

  console.log(chalk.red("BEFORE"));
  observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });
  console.log(chalk.red("AFTER"));
}

console.log(
  chalk.yellow("\n-------------------------------------------------- 02")
);
{
  /*
   * 如下，observable 也可以异步返回多个数据
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log(chalk.yellow("BEFORE"));
  observable.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });
  console.log(chalk.yellow("AFTER"));
}
