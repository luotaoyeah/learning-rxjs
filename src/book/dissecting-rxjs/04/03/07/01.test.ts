/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestScheduler } from 'rxjs/testing';
import { delay, repeatWhen, take } from 'rxjs/operators';
import { interval, of } from 'rxjs';

describe('src/book/dissecting-rxjs/04/03/07/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // repeat()     是在 upstream$ 每次 complete 的时候 re-subscribe,
  // repeatWhen() 是在 notifier$ 每次吐出数据的时候 re-subscribe, 可以控制 re-subscribe 的节奏
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const upstream$ = of(1, 2);
      const notifier$ = interval(1000).pipe(take(2));
      // notifier 在 upstream$ 第一次 complete 的时候调用
      const notifier = () => notifier$;

      expectObservable(upstream$.pipe(repeatWhen(notifier))).toBe('(ab) 996ms (ab) 996ms (ab|)', {
        a: 1,
        b: 2,
      });
    });
  });

  // notifier$ 可以是我们自己创建的一个 observable,
  // notifier$ 也可以从 notifier 的参数 notification$ 而来,
  // upstream$ 每次 complete 的时候, notification$ 就会吐出一个数据
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const upstream$ = of(1, 2);
      const notifier = (notification$: any) => notification$.pipe(delay(1000), take(2));

      expectObservable(upstream$.pipe(repeatWhen(notifier))).toBe('(ab) 996ms (ab) 996ms (ab|)', {
        a: 1,
        b: 2,
      });
    });
  });
});
