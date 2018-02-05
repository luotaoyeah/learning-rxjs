/*
 * Overview
 *     Subscription
 */

import chalk from "chalk";
import { interval, Observable, Subscription } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 当我们调用 Observable.subscribe() 方法时，返回的就是一个 subscription 对象，
   * subscription 表示一个 disposable resource，通常指的就是一个 observable execution，
   * 我们可以通过调用 Subscription.unsubscribe() 方法来终止 observable execution，释放资源
   */

  const observable: Observable<number> = interval(1000);
  const subscription: Subscription = observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 5000);
}
