/*
 * Overview
 *     Subject
 *         Multicasted Observables
 *             ReplaySubject
 */

import chalk from "chalk";
import { ReplaySubject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * ReplaySubject 除了可以设置记录的数据个数（bufferSize），还可以设置窗口时间（windowTime），
   * 窗口时间表示数据可以在记录中保留的时间，当数据在记录中的时间超过了窗口时间之后，该数据就会从记录中被删除
   */

  const subject: ReplaySubject<number> = new ReplaySubject<number>(100, 500);

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);
  subject.next(5);

  setTimeout(() => {
    subject.next(6);
    subject.next(7);
    subject.next(8);
    subject.next(9);
    subject.next(10);
  }, 500);

  setTimeout(() => {
    /*
     * 此时，最开始填充的 5 个数据已经超时，因此它们已经从记录中删除掉了
     */
    subject.subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
  }, 600);
}
