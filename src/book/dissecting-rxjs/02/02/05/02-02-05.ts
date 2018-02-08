import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.5 永无止境的 Observable
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * observable 可以一直推送数据，永不终止
   */

  const source$ = new Observable((subscriber: Subscriber<number>) => {
    let n = 1;
    setInterval(() => {
      subscriber.next(n++);
    }, 1000);
  });

  source$.subscribe((value: number) => {
    console.log(chalk.white(String(value)));
  });
}
