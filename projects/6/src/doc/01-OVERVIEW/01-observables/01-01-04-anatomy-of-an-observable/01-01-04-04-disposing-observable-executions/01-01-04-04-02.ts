/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Disposing Observable Execution
 */

import chalk from 'chalk';
import { Observable, Subscriber, Subscription } from 'rxjs';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * 我们可以通过调用 Subscription.unsubscribe() 方法终止 observable execution,
   * 但是具体需要怎么去终止, 以及需要怎么去释放资源, 需要我们自己定义,
   * 如何定义? 通过在 subscribe 参数函数中, 返回一个新的 function,
   * 这个 function 里面包含的就是如何释放资源的逻辑,
   * 当我们调用 Subscription.unsubscribe() 方法时, 这个返回的 function 就会自动执行
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    const timer: NodeJS.Timeout = setInterval(() => {
      subscriber.next(9);
    }, 1000);

    /*
     * 在 subscribe 函数中, 返回一个 function
     */
    return () => {
      console.log(chalk.red('DISPOSING'));
      clearInterval(timer);
    };
  });

  const subscription: Subscription = observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  setTimeout(() => {
    /*
     * 当我们调用 unsubscribe() 方法时, 就会自动调用我们在 subscribe() 函数中返回的 function
     */
    subscription.unsubscribe();
  }, 5000);
}
