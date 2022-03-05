// 2.4 hot observable 和 cold observable

import { Observable, Subscriber } from 'rxjs';

// hot observable:
//   所有的 observer 共用一个 producer, 只接收订阅之后吐出的数据
//
// cold observable:
//   每一个 observer 有自己的 producer, 接收所有吐出的数据

const source$ = new Observable<number>((observer: Subscriber<number>) => {
  let i = 0;

  const timer = setInterval(() => {
    observer.next(++i);
  }, 1000);

  return {
    unsubscribe(): void {
      if (timer) {
        clearInterval(timer);
      }
    },
  };
});

export { source$ };
