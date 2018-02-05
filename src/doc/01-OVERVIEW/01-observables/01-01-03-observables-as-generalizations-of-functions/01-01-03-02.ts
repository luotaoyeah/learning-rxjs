/*
 * Overview
 *     Observable
 *         Observables as Generalizations Of Functions
 *             Observable Is Not Asynchronous
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  function foo() {
    console.log(chalk.red("foo"));
    return 9;
  }

  console.log(chalk.red("BEFORE"));
  const x = foo.call(null);
  console.log(chalk.red(x.toString()));
  console.log(chalk.red("AFTER"));
}

console.log(
  chalk.yellow("\n-------------------------------------------------- 02"),
);
{
  /*
   * observable 并不是 asynchronous 的
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    console.log(chalk.yellow("foo"));
    subscriber.next(9);
  });

  /*
   * 看起来，调用 subscribe() 方法就像是在调用 EventEmitter.addListener() 方法，添加回调函数，
   * 实际上，调用 subscribe() 方法就像是在调用 Function.prototype.call() 方法，是在执行函数，不是在添加回调函数
   */
  console.log(chalk.yellow("BEFORE"));
  observable.subscribe((x: number) => {
    console.log(chalk.yellow(x.toString()));
  });
  console.log(chalk.yellow("AFTER"));
}
