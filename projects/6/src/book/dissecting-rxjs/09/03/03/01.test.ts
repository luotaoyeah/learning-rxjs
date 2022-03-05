import { TestScheduler } from 'rxjs/testing';
import { interval, of, range } from 'rxjs';
import { catchError, map, retryWhen, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/09/03/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // retryWhen() 在第一次捕获异常时, 调用参数 notifier 获取 notifier$,
  // notifier$ 每吐出一个数据, 就重试一次,
  // notifier$ 决定了重试的次数, 和每次重试的开始时刻
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
        retryWhen(() => interval(1000).pipe(take(2))),
        catchError(() => of(8)),
      );

      expectObservable(source$).toBe('(abc) 995ms (abc) 995ms (abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
