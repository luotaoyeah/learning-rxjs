// 2.5 操作符简介

import { Observable, Subscriber } from 'rxjs';

const source$ = new Observable<number>((observer: Subscriber<number>) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

export { source$ };
