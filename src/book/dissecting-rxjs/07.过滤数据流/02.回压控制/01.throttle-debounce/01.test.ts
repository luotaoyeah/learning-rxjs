import { TestScheduler } from 'rxjs/testing';
import { timer } from 'rxjs';
import { take, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07.过滤数据流/02.回压控制/01.throttle-debounce/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // throttleTime() 的工作原理:
  //   1. 接收数据, 开始计时, 数据吐给下游.
  //      计时期间丢弃上游数据,
  //   2. 停止计时, 重复 1.
  //
  // 注意, 如果停止计时的时候, 刚好有上游的数据吐出, 则先停止计时, 再接收数据.

  it('01', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(timer(1000, 1000).pipe(take(6), throttleTime(3000))).toBe('1s a 2999ms b 1999ms |', {
        a: 0,
        b: 3,
      });
    });
  });
});
