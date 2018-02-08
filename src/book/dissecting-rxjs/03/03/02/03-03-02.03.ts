/*
 * TODO 3.3.2 关联 Observable
 *     3. lift()
 */

import { Observable, OperatorFunction, Subscriber } from "rxjs";

function fn01<T, R>(): (project: (t: T) => R) => OperatorFunction<T, R> {
  return map;
}

function map<T, R>(project: (t: T) => R): OperatorFunction<T, R> {
  return (t: Observable<T>) => {
    return t.lift((subscriber: Subscriber<R>) => {
      t.subscribe({
        next(value: T) {
          try {
            subscriber.next(project(value));
          } catch (e) {
            subscriber.error(e);
          }
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
