// 2.2.6 observable 的完结

import { Observable, Subscriber } from 'rxjs';

// `next()`     方法用来通知 observer: 有新的数据出来了,
// `complete()` 方法用来通知 observer: 所有的数据都已经吐完了
const source$ = new Observable((observer: Subscriber<number>) => {
  let n = 1;
  const timer = setInterval(() => {
    observer.next(n++);

    if (n > 3) {
      clearInterval(timer);
      observer.complete();
    }
  }, 1000);
});

// 当 observer 接收到 complete 通知时, 就会执行 `complete()` 方法
source$.subscribe({
  next(value: number) {
    console.log(value);
  },
  complete() {
    console.log('DONE');
  },
});

export { source$ };
