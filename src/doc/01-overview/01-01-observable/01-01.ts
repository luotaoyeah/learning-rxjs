/*
 * Overview
 *     Observable
 */

import { Observable, Subscriber } from "rxjs";
import chalk from "chalk";

console.log("\n-------------------------------------------------- 01");
{
  /*
   * observable 是一个包含多个 value 的 lazy-push collection，
   * 也就是说，这个 collection 里面的 value 不是一次性 push 进去的
   */

  /*
   * 直接通过 constructor 创建一个 observable 对象实例，
   * 接收一个参数 subscribe 函数，
   * 后面每 subscribe 一次这个 observable 对象，这个 subscribe 函数就会执行一次
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    console.log(chalk.yellow("SUBSCRIBER"));
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  /*
   * 订阅（subscribe）
   */
  observable.subscribe({
    next(value: number) {
      console.log(`${new Date().toLocaleTimeString()} NEXT: ${value}`);
    },
    complete() {
      console.log(`${new Date().toLocaleTimeString()} COMPLETE`);
    }
  });

  /*
   * 再次订阅
   */
  observable.subscribe({
    next(value: number) {
      console.log(
        chalk.blue(`${new Date().toLocaleTimeString()} NEXT ${value}`)
      );
    },
    complete() {
      console.log(chalk.blue(`${new Date().toLocaleTimeString()} COMPLETE`));
    }
  });

  /*
   * 延迟一段时间之后，再次订阅
   */
  setTimeout(() => {
    observable.subscribe({
      next(value: number) {
        console.log(
          chalk.red(`${new Date().toLocaleTimeString()} NEXT ${value}`)
        );
      },
      complete() {
        console.log(chalk.red(`${new Date().toLocaleTimeString()} COMPLETE`));
      }
    });
  }, 2000);
}
