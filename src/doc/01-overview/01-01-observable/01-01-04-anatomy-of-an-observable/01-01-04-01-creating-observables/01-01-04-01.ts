/*
 * Overview
 *     Observable
 *         Anatomy Of An Observable
 *             Creating Observables
 */

import { interval, Observable, Subscriber } from "rxjs";
import chalk from "chalk";
import { take } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 可以使用 constructor 来创建一个新的 observable 对象，
   * 构造函数接收一个参数：subscribe 函数
   */

  const observable = new Observable((subscriber: Subscriber<string>) => {
    setInterval(() => {
      subscriber.next("hi");
    }, 1000);
  });

  observable.subscribe((value: string) => {
    console.log(chalk.red(value));
  });
}

console.log(
  chalk.yellow("\n-------------------------------------------------- 02")
);
{
  /*
   * 也可以使用各种 creation function 来创建新的 observable 对象，
   * 如 of()，from()，interval() 等等
   */

  interval(1000)
    .pipe<number>(take<number>(4))
    .subscribe((value: number) => {
      console.log(chalk.yellow(value.toString()));
    });
}
