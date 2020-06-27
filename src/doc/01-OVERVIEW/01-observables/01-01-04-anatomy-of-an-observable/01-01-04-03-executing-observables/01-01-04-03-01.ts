/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Executing Observables
 */

import chalk from 'chalk';
import { Observable, Subscriber } from 'rxjs';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * 构造函数的参数：subscribe 函数，称之为 observable execution，
   * observable execution 是 lazy-computation 的，只有当某个 observer 订阅了该 observable 时，才会执行，
   * 随着时间的推移，observable execution 会生产很多的 value，可以是 synchronous，也可以是 asynchronous 的，
   * 这些 value 有三种：
   *     next
   *     error
   *     complete
   * 其中，next 可以有多个，error 或者 complete 只能有一个，并且不能同时存在，
   * 当 error 或者 complete 产生之后，就不能再产生其他任何的 value 了
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();

    /*
     * complete() 之后再调用 next() 是没有效果的
     */
    subscriber.next(4);
  });

  observable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });
}
