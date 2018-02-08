/*
 * Overview
 *     Subject
 */

import chalk from "chalk";
import { Subject } from "rxjs";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * subject 是一种特殊的 observable，
   * 对于普通的 observable 来说，一个 observer 对应一个单独的 observable execution，称之为单播（unicast），
   * 对于 subject 来说，多个 observer 对应同一个 observable execution，称之为多播（multicast），
   * subject 类似于 EventEmitter，在调用 subscribe() 方法时，subject 不会创建一个新的 execution，
   * 而是将这个 observer 添加到内部维护的一个 observer list 中去，这些 observer 共享同一个 execution
   */

  const subject: Subject<number> = new Subject<number>();

  /*
   * subject 是一个 observable，
   * 因此可以调用 Observable.subscribe() 方法进行订阅，
   * 跟 observable 不同之处在于，它不会创建一个新的 execution，而是将这个 observer 添加到一个 list 中去
   */
  subject.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  subject.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  /*
   * subject 同时也是一个 observer，
   * 因此可以调用 Subject.next() 方法来填充数据，
   * 当然，也可以调用 Subject.error() 和 Subject.complete() 方法，
   *
   * 当调用 Subject.next() 方法填充数据时，它所有的 observer 都可以接收到这个数据
   */
  subject.next(1);
  subject.next(2);
}
