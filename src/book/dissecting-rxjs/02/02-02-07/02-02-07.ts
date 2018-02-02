import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.7 Observable 的出错处理
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * observable 中发生异常时, 如何通知 observer ?
   * 使用 Subscriber.error() 方法
   */

  const source$ = new Observable((subscriber: Subscriber<number>) => {
    subscriber.next(9);
    /*
     * 调用 Subscriber.error() 方法, 通知 observer 发生了错误,
     * 并终止 observable 的运行
     *
     * 无论是调用 error() 方法还是 complete() 方法, 都会终止 observable 的运行,
     * 当 observable 被终止之后, 再调用任何 next()/error()/complete() 方法都无效了
     */
    subscriber.error(new Error("SOME ERR"));
    subscriber.complete();
  });

  source$.subscribe({
    next(value: number) {
      console.log(chalk.white(String(value)));
    },
    error(e: Error) {
      console.log(chalk.redBright(e.message));
    },
    complete() {
      console.log(chalk.white("DONE"));
    },
  });
}
