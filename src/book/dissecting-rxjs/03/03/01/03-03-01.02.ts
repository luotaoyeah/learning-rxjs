/*
 * 3.3.1 操作符函数的实现
 *     2. 订阅和退订处理
 */

import { Observable, OperatorFunction, Subscriber } from "rxjs";

function fn01<T, R>(): (project: (t: T) => R) => OperatorFunction<T, R> {
  return map;
}

/*
 * 对于我们模拟实现的 map 操作符, 当下游退订时, 我们也应该通知上游进行退订
 */
function map<T, R>(project: (t: T) => R): OperatorFunction<T, R> {
  return (t: Observable<T>) => {
    return new Observable((subscriber: Subscriber<R>) => {
      const subscription = t.subscribe({
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

      return {
        unsubscribe(): void {
          subscription.unsubscribe();
        },
      };
    });
  };
}

export { fn01 };
