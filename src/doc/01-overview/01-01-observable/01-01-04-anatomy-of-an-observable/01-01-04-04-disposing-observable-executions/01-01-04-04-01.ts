/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Disposing Observable Execution
 */

import chalk from "chalk";
import { from, Observable, Subscription } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 因为 observable execution 可能是无限执行的，因此我们必须存在一个机制，
   * 允许我们可以在任何时候，手动终止 observable execution 的执行，
   * Observable.subscribe() 方法返回了一个 subscription 对象，
   * 可以通过调用 subscription.unsubscribe() 方法，取消 execution 的执行
   */

  const observable: Observable<number> = from<Array<number>>([1, 2, 3]);

  const subscription: Subscription = observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subscription.unsubscribe();
}
