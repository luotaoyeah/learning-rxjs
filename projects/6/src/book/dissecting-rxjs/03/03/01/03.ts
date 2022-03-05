// 3.3.1 操作符函数的实现
//     3. 处理异常情况

import { Observable, OperatorFunction, Subscriber } from 'rxjs';

function myMap<T, R>(projection: (t: T) => R): OperatorFunction<T, R> {
  return (upstream$: Observable<T>) => {
    return new Observable((observer: Subscriber<R>) => {
      const subscription = upstream$.subscribe({
        next(value: T) {
          // 将当前 operator 中产生的 error 吐给下游
          try {
            observer.next(projection(value));
          } catch (e) {
            observer.error(e);
          }
        },
        error(e: Error) {
          // 将上游的 error 继续吐给下游
          observer.error(e);
        },
        complete() {
          observer.complete();
        },
      });

      return {
        unsubscribe: () => {
          subscription.unsubscribe();
        },
      };
    });
  };
}

export { myMap };
