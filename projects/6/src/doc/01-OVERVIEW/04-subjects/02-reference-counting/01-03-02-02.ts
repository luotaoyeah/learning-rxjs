/*
 * Overview
 *     Subject
 *         Multicasted Observables
 *             Reference Counting
 */

import chalk from 'chalk';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * ConnectableObservable 提供了一种机制: refCount(), 能够实现:
   *     当 observer 的数量从 0 变为 1 时, 会自动帮我们调用 ConnectableObservable.connect() 方法启动 observable execution,
   *     当 observer 的数量从 1 变为 0 时, 会自动帮我们调用 Subscription.unsubscribe() 方法终止 observable execution
   */

  const observable: Observable<number> = interval(500);
  const subject: Subject<number> = new Subject<number>();

  const observable02: Observable<number> = observable.pipe<number, number>(multicast<number>(subject), refCount<number>());

  const subscription01: Subscription = observable02.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  let subscription02: Subscription | null = null;
  setTimeout(() => {
    subscription02 = observable02.subscribe((value: number) => {
      console.log(chalk.yellow(value.toString()));
    });
  }, 600);

  setTimeout(() => {
    subscription01.unsubscribe();
  }, 1200);

  setTimeout(() => {
    if (subscription02 !== null) {
      subscription02.unsubscribe();
    }
  }, 1600);
}
