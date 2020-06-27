/*
 * Overview
 *     Subject
 *         Multicasted Observables
 */

import chalk from 'chalk';
import { ConnectableObservable, from, Observable, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * 我们可以将一个 subject 当作一个 observer 传递给 Observable.subscribe() 方法，
   * 通过这种方式，将一个 unicast 的 observable 转换为一个 multicast 的 observable
   *
   * 我们也可以使用 multicast 这个 operator，将一个 Observable 转换为一个 ConnectableObservable，
   * 实际上底层还是使用的 subject 来实现，
   */

  const observable: Observable<number> = from<Array<number>>([11, 22, 33]);
  const subject: Subject<number> = new Subject<number>();

  const connectableObservable: ConnectableObservable<number> = observable.pipe<number>(multicast(subject)) as ConnectableObservable<number>;

  /*
   * 调用 ConnectableObservable.subscribe() 方法，实际上底层调用的是 Subject.subscribe() 方法，
   * 因此，只是将这个 observer 添加到对应的 observer list 中去
   */
  connectableObservable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  connectableObservable.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  /*
   * 调用 ConnectableObservable.connect() 方法，实际上底层调用的是 Observable.subscribe(subject) 方法，
   * 此时，对应的 observable execution 才正式启动，
   * ConnectableObservable.connect() 返回的是一个 subscription 对象
   */
  const subscription = connectableObservable.connect();

  subscription.unsubscribe();
}
