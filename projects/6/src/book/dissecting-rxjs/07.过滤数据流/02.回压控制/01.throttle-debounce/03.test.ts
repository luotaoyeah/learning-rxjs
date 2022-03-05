import { TestScheduler } from 'rxjs/testing';
import { timer } from 'rxjs';
import { take, throttle, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/01/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // throttle() 使用一个 duration$ 来计时, 当 duration$ 吐出第一个数据时/完结时, 停止计时
  //
  // throttle() 的工作原理:
  //   1. 接受数据, 调用参数函数返回 duration$ 开始计时, 数据吐给下游
  //        计时期间丢弃上游数据,
  //   2. duration$ 吐出数据, 停止计时, 重复 1.
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = timer(500, 500).pipe(take(6));

      expectObservable(source$.pipe(throttleTime(1500))).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });

      expectObservable(source$.pipe(throttle(() => timer(1500)))).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });
    });
  });
});
