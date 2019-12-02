// 2.2.7 observable 的出错处理

import { Observable, Subscriber } from 'rxjs';

// `error()` 方法用来通知 observer: 发生了错误
const source$ = new Observable((observer: Subscriber<number>) => {
  observer.next(1);

  observer.error(2);

  // 当 `complete()` 或者 `error()` 调用之后, 表示 observable 已经完结,
  // 此时, 再调用 `next()` / `complete()` / `error()` 都不再有效果
  observer.next(3);
  observer.complete();
});

export { source$ };
