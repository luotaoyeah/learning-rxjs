/*
 * Overview
 *     Subject
 *         Multicasted Observables
 *             Reference Counting
 */

import chalk from "chalk";
import {
  ConnectableObservable,
  interval,
  Observable,
  Subject,
  Subscription
} from "rxjs";
import { multicast } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 默认情况下，
   *     需要我们手动调用 ConnectableObservable.connect() 方法之后，observable execution 才会开始启动，
   *     并且需要手动调用 Subscription.unsubscribe() 方法来终止 observable execution
   */

  const observable: Observable<number> = interval(500);
  const subject: Subject<number> = new Subject<number>();

  const connectableObservable: ConnectableObservable<number> = observable.pipe<
    number
  >(multicast<number>(subject)) as ConnectableObservable<number>;

  const subscription01: Subscription = connectableObservable.subscribe(
    (value: number) => {
      console.log(chalk.red(value.toString()));
    }
  );

  /*
   * 手动调用 ConnectableObservable.connect() 方法启动 observable execution
   */
  const connectableSubscription: Subscription = connectableObservable.connect();

  let subscription02: Subscription | null = null;
  setTimeout(() => {
    subscription02 = connectableObservable.subscribe((value: number) => {
      console.log(chalk.yellow(value.toString()));
    });
  }, 600);

  setTimeout(() => {
    subscription01.unsubscribe();
  }, 1100);

  setTimeout(() => {
    if (subscription02) {
      subscription02.unsubscribe();

      /*
       * 手动调用 Subscription.unsubscribe() 方法终止 observable execution
       */
      connectableSubscription.unsubscribe();
    }
  }, 1600);
}
