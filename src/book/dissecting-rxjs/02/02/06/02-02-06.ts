import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.6 Observable 的完结
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
/*
 * 当 observable 数据推送完毕时, 需要告诉所有的 observer 这个消息,
 * 使用的是 Subscriber.complete() 方法
 */

const source$ = new Observable((subscriber: Subscriber<number>) => {
  let n = 1;

  const timer = setInterval(() => {
    subscriber.next(n++);

    if (n > 3) {
      clearInterval(timer);
      subscriber.complete();
    }
  }, 1000);
});

/*
 * 当 observer 接收到 complete 通知时, 就会执行 complete 方法
 */
source$.subscribe({
  next(value: number) {
    console.log(chalk.white(String(value)));
  },
  complete() {
    console.log(chalk.white("DONE"));
  },
});

export { source$ };
