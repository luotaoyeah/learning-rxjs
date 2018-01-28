/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Subscribinig To Observables
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  const observable = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(9);
    subscriber.complete();
  });

  /*
   * 调用 Observable.subscribe() 方法，来订阅一个 observable 对象，
   * Observable.subscribe() 方法接收一个 Observer 对象作为参数，
   * 这个订阅过程，就类似于调用一个 function，同时传入一个 callback 函数作为参数，
   *
   * 使用 constructor 创建 observable 对象时，传入了一个 subscribe 函数作为参数，
   * 当我们调用 subscribe() 方法订阅时，实际上就会调用这个 subscribe 参数函数，
   * 因此，当多次订阅时，它们之间时相互独立的
   */
  observable.subscribe({
    next(value: number) {
      console.log(chalk.red(value.toString()));
    }
  });
}

console.log(
  chalk.yellow("\n-------------------------------------------------- 02")
);
{
}
