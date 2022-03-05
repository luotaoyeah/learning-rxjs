import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/04/03/01/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // timer(dueTime) 参数 dueTime 如果是一个 number, 表示 dueTime 毫秒之后吐出 0, 然后 complete
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(timer(1000)).toBe('1000ms (a|)', {
        a: 0,
      });
    });
  });

  // timer(dueTime) 参数 dueTime 如果是一个 Date, 表示在 dueTime 那一时刻吐出 0, 然后 complete
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const dueTime = new Date(Date.now() + 1000);
      expectObservable(timer(dueTime)).toBe(`${dueTime.getTime()}ms (a|)`, {
        a: 0,
      });
    });
  });

  // 第二个参数 periodOrScheduler 表示, 在第一个数据吐出之后, 开始每隔 periodOrScheduler 毫秒持续产生递增 1 的数据, 类似于 interval(),
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(timer(3000, 1000).pipe(take(3))).toBe('3000ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });

  // 如果第一个参数和第二个参数一样, 则此时的 timer() 跟 interval() 功能一样,
  // 使用 timer() 模拟实现 interval()
  it('should work 04', () => {
    scheduler.run(({ expectObservable }) => {
      const myInterval = (period: number = 0) => timer(period, period);

      expectObservable(interval(1000).pipe(take(3))).toBe('1000ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
      expectObservable(myInterval(1000).pipe(take(3))).toBe('1000ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
