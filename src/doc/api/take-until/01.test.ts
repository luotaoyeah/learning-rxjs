import { TestScheduler } from 'rxjs/testing';
import { interval, Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

describe('src/doc/02-REFERENCE/take-until/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * takeUntil() 接受一个参数 notifier$, 表示从上游截取数据, 直到 notifier$ 吐出第一个数据, 或者完结, 或者抛出错误为止
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        takeUntil(
          new Observable<never>((subscriber) => {
            timer(2500).subscribe(() => {
              subscriber.error('ERR');
            });
          }),
        ),
      );

      expectObservable(source$).toBe(
        '1s a 999ms b 499ms #',
        {
          a: 0,
          b: 1,
        },
        'ERR',
      );
    });
  });
});
