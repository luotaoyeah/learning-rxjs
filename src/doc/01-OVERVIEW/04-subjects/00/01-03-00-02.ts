/*
 * Overview
 *     Subject
 */

import chalk from "chalk";
import { from, Observable, Subject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 因为 subject 是一个 observer，因此一个 subject 对象可以作为 Observable.subscribe() 方法的参数
   */

  const subject: Subject<number> = new Subject<number>();

  subject.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subject.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  const observable: Observable<number> = from<Array<number>>([1, 2, 3]);

  /*
   * 将 subject 作为 Observable.subscribe() 方法的参数，
   * 这样就将一个 unicast 的 observable 转换成了一个 multicast 的 observable
   */
  observable.subscribe(subject);
}
