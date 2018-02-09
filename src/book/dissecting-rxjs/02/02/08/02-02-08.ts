import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.8 Observer 的简单形式
 */
const source$ = new Observable((subscriber: Subscriber<number>) => {
  subscriber.next(9);
  subscriber.complete();
});

/*
 * 使用三个函数, 分别表示 next(), error(), complete() 函数,
 * 这种方式已经被**废弃**了
 */
source$.subscribe(
  (value: number) => {
    console.log(chalk.white(String(value)));
  },
  null,
  () => {
    console.log(chalk.white("DONE"));
  },
);

export { source$ };
