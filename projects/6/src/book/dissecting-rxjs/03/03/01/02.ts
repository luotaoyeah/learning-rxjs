// 3.3.1 操作符函数的实现
//     2. 订阅和退订处理

import { Observable, OperatorFunction } from 'rxjs';

function myMap<T, R>(projection: (t: T) => R): OperatorFunction<T, R> {
  return function (upstream$: Observable<T>): Observable<R> {
    return new Observable<R>((observer) => {
      const upstreamSubscription = upstream$.subscribe({
        next: (value) => {
          observer.next(projection(value));
        },
        error: (e) => {
          observer.error(e);
        },
        complete: () => {
          observer.complete();
        },
      });

      // 当下游退订我时, 我就去退订上游
      return {
        unsubscribe() {
          upstreamSubscription.unsubscribe();
        },
      };
    });
  };
}

export { myMap };
