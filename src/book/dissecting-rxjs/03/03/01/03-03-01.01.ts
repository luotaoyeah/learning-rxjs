/*
 * 3.3.1 操作符函数的实现
 *     1. 返回⼀个全新的 Observable 对象
 */

import { Observable, OperatorFunction } from "rxjs";

function fn01<T, R>(): (project: (t: T) => R) => OperatorFunction<T, R> {
  /*
   * 如何来实现一个操作符?
   * 我们以 map() 操作符为例, 操作符的本质是一个函数, 它接收一个 observable 对象, 同时返回一个新的 observable 对象
   */

  return map;
}

function map<T, R>(project: (t: T) => R): OperatorFunction<T, R> {
  return (t: Observable<T>) => {
    return new Observable<R>(subscriber => {
      t.subscribe({
        next(value: T) {
          subscriber.next(project(value));
        },
        error(e: Error) {
          subscriber.error(e);
        },
        complete() {
          subscriber.complete();
        },
      });
    });
  };
}

export { fn01 };
