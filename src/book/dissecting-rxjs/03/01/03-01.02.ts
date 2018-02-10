/*
 * 3.1 为什么要有操作符
 */

import { Observable, Subscriber } from "rxjs";

function fn01(): Observable<number> {
  /*
   * 跟数组中的 filter() 和 map() 类似, rxjs 提供了类似的 filter 和 map 操作符
   */

  return new Observable((subscriber: Subscriber<number>) => {
    let i: number = 0;

    while (i < 4) {
      subscriber.next(++i);
    }

    subscriber.complete();
  });
}

export { fn01 };
