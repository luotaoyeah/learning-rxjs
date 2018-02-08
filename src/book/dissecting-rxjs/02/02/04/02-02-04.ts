import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.4 跨越时间的 Observable
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 如何让 observable 每隔一秒推送一个数据？
   */

  const source$ = new Observable((subscriber: Subscriber<number>) => {
    let num = 1;

    const timer = setInterval(() => {
      subscriber.next(num++);
      if (num > 3) {
        clearInterval(timer);
      }
    }, 1000);
  });

  source$.subscribe((value: number) => {
    console.log(chalk.white(String(value)));
  });
}
