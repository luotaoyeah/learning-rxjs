// 3.3.1 操作符函数的实现
//     1. 返回一个全新的 observable 对象

import { Observable, OperatorFunction } from 'rxjs';

function myMap<T, R>(projection: (t: T) => R): OperatorFunction<T, R> {
  return function (upstream$: Observable<T>): Observable<R> {
    return new Observable<R>((observer) => {
      upstream$.subscribe({
        next: (value: T) => {
          observer.next(projection(value));
        },
        error: (e) => {
          return observer.error(e);
        },
        complete: () => {
          observer.complete();
        },
      });
    });
  };
}

export { myMap };
