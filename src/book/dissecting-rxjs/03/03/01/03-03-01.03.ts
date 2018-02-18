/*
 * 3.3.1 操作符函数的实现
 *     3. 处理异常情况
 */

import { Observable, OperatorFunction, Subscriber } from "rxjs";

function fn01<T, R>(): (project: (t: T) => R) => OperatorFunction<T, R> {
  return map;
}

function map<T, R>(project: (t: T) => R): OperatorFunction<T, R> {
  return (t: Observable<T>) => {
    return new Observable((subscriber: Subscriber<R>) => {
      const subscription = t.subscribe({
        next(value: T) {
          /*
           * 对于我们模拟实现的 map() 操作符, 参数 project 可能会抛出异常, 我们应该使用 try/catch 捕获这个异常并交给下游去处理
           */
          try {
            subscriber.next(project(value));
          } catch (e) {
            subscriber.error(e.message);
          }
        },
        error(e: Error) {
          subscriber.error(e);
        },
        complete() {
          subscriber.complete();
        },
      });

      return {
        unsubscribe(): void {
          subscription.unsubscribe();
        },
      };
    });
  };
}

export { fn01 };
