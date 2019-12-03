// 2.3 退订 observer

import { Observable, Subscriber } from 'rxjs';

const source$ = new Observable((subscriber: Subscriber<number>) => {
  let i = 0;
  const timer = setInterval(() => {
    subscriber.next(++i);
    console.log(i);
  }, 1000);

  // 此处可以返回一个 `TeardownLogic` 对象, 它有一个 `unsubscribe()` 方法,
  // 当我们调用 `Subscription.unsubscribe()` 方法时, 这个 `unsubscribe()` 方法也会执行,
  // 可以用来清理资源
  return {
    unsubscribe(): void {
      console.log('unsubscribe()');
      clearInterval(timer);
    },
  };
});

export { source$ };
