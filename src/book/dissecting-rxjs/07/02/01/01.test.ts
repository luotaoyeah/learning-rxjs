import { TestScheduler } from 'rxjs/testing';
import { timer } from 'rxjs';
import { take, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // throttleTime() 的工作原理:
  //   1. 接受数据, 开始计时, 数据吐给下游
  //        计时期间丢弃上游数据,
  //   2. 停止计时, 重复 1.
  //
  // 注意, 如果停止计时的时候, 刚好有上游的数据吐出, 则先停止计时, 再接收数据

  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(timer(500, 500).pipe(take(6), throttleTime(1500))).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });
    });
  });
});
