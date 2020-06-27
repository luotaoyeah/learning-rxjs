import { TestScheduler } from 'rxjs/testing';
import { concat, interval, timer } from 'rxjs';
import { debounceTime, map, take, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/01/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // debounceTime(dueTime) 的的工作原理:
  //   1. 接收数据, 设为"最新数据", 开始计时
  //        计时期间有新的数据:
  //          2. 重复 1.
  //        计时期间无新的数据:
  //          2. 停止计时, 数据吐给下游, 重复 1.
  //
  // 注意, 如果最后一个"最新数据"的计时还没停止时上游就完结了, 则最后这个"最新数据"也会吐出
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(timer(500, 500).pipe(take(6), throttleTime(1500))).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });
      expectObservable(timer(500, 500).pipe(take(6), debounceTime(1500))).toBe('3s (a|)', { a: 5 });

      const source$ = concat(
        interval(500).pipe(
          take(2),
          map((i) => `a_${i}`),
        ),
        timer(1500, 500).pipe(
          take(2),
          map((i) => `b__${i}`),
        ),
      );

      expectObservable(source$).toBe('500ms a 499ms b 1499ms c 499ms (d|)', {
        a: 'a_0',
        b: 'a_1',
        c: 'b__0',
        d: 'b__1',
      });

      expectObservable(source$.pipe(throttleTime(1000))).toBe('500ms a 1999ms b 499ms | ', {
        a: 'a_0',
        b: 'b__0',
      });

      expectObservable(source$.pipe(debounceTime(1000))).toBe('2000ms a 999ms (b|)', {
        a: 'a_1',
        b: 'b__1',
      });
    });
  });
});
