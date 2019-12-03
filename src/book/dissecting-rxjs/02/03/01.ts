// 2.3 退订 observer

import { Observable, Subscriber } from 'rxjs';

const source$: Observable<number> = new Observable((observer: Subscriber<number>) => {
  let i = 0;
  setInterval(() => {
    observer.next(++i);
    console.log(i);
  }, 1000);
});

export { source$ };
