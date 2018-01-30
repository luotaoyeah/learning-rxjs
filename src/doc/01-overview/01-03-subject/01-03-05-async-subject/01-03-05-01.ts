/*
 * Overview
 *     Subject
 *         AsyncSubject
 */

import chalk from "chalk";
import { AsyncSubject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * AsyncSubject 的特点是：
   *     在调用了 AsyncSubject.complete() 之后，将最后一个数据发送给所有的 observers
   */

  const subject: AsyncSubject<number> = new AsyncSubject<number>();

  subject.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);
  subject.next(5);

  subject.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  subject.next(6);
  subject.complete();
}
