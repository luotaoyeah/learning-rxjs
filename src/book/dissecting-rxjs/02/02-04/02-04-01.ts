/*
 * 2.4 Hot Observable 和 Cold Observable
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 因为 observable 是一个数据流, 它在一个时间范围内持续地在推送数据,
   * 当我们给这个 observable 订阅一个 observer 时, 有两种可能的场景:
   *
   *     1. 这个 observer 只接收最新的推送数据, 之前错过的数据就不管了
   *     2. 这个 observer 会接收到在它订阅之前推送的数据
   *
   * 第一种场景里的 observable 称之为 hot observable,
   * 第二种场景里的 observable 称之为 cold observable
   */
}

function fn02(): Observable<number> {
  console.log(
    chalk.yellow("\n-------------------------------------------------- 02"),
  );
  /*
   * hot observable 的特点是, 对于所有的 observer, 始终只存在一个生产者(producer),
   * cold observable 的特点是, 每订阅一个 observer, 就会创建一个新的 producer,
   * 我们使用 new Observable() 创建的 observable 都是 cold observable
   */

  return new Observable<number>((subscriber: Subscriber<number>) => {
    let i = 0;

    const timer = setInterval(() => {
      subscriber.next(++i);
    }, 1000);

    return {
      unsubscribe(): void {
        if (timer) {
          clearInterval(timer);
        }
      },
    };
  });
}

export { fn02 };
