/*
 * Overview
 *     Subscription
 */

import chalk from "chalk";
import { interval, Observable, Subscription } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 可以调用 Subscription.add() 方法，添加一个 child subscription 对象，
   * 这样，当调用 parent subscription 的 unsubscribe() 方法时，
   * 所有这些 child subscription 的 unsubscribe() 方法也都会被调用
   */

  const observable01: Observable<number> = interval(200);
  const observable02: Observable<number> = interval(400);

  const subscription01: Subscription = observable01.subscribe(
    (value: number) => {
      console.log(chalk.red(value.toString()));
    }
  );

  const subscription02: Subscription = observable02.subscribe(
    (value: number) => {
      console.log(chalk.yellow(value.toString()));
    }
  );

  /*
   * 添加一个 child subscription
   */
  subscription01.add(subscription02);

  setTimeout(() => {
    /*
     * 调用 parent subscription 的 unsubscribe() 方法，
     * 它的所有 child subscription 的 unsubscribe() 方法会被自动调用
     */
    subscription01.unsubscribe();
  }, 5000);
}
