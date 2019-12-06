import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { Observable, of, Subscriber } from 'rxjs';
import { repeat, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/04/02/05/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // repeat 用来重复订阅上游数据
  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2).pipe(repeat(2));
      expectObservable(source$).toBe('(abcd|)', {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
      });
    });
  });

  it('should repeat x times', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      // 参数为 0 表示重复 0 次, 数据为空
      expectObservable(of(1, 2).pipe(repeat(0))).toBe('|');

      // 参数为 undefined 或者为负表示无限重复
      expectObservable(of(1, 2).pipe(repeat()).pipe(take(5))).toBe('(abcde|)', {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
        e: 1,
      });
    });
  });

  /*
   * repeat 是如何重复订阅上游数据的?
   * repeat 会在上游数据 complete 之后再次 subscribe
   * 因此上游数据必须 complete, 否则 repeat 会一直等待它 complete
   */
  it('should re-subscribe', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = new Observable((observer: Subscriber<number>) => {
        console.log('SUBSCRIBE');

        observer.next(1);
        observer.next(2);

        observer.complete();

        return {
          unsubscribe() {
            console.log('UNSUBSCRIBE');
          },
        };
      });

      expectObservable(source$.pipe(repeat(2))).toBe('(abab|)', {
        a: 1,
        b: 2,
      });
    });
  });
});
