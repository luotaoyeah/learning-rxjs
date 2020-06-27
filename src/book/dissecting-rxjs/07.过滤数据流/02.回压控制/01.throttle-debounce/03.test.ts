import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
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

  // 默认配置为: { leading: true, trailing: false },
  //   表示在开始计时时, 吐出数据
  //
  // 如果配置为: { leading: false, trailing: true },
  //   表示在结束计时时, 吐出计时期间的最后一个上游数据
  //
  // 如果配置为: { leading: true, trailing: true },
  //   表示在开始计时时, 吐出数据
  //   表示在结束计时时, 吐出计时期间的最后一个上游数据(如果这个数据就是开始吐出的那个数据, 此时不再吐出)
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1500, undefined, {
            leading: true,
            trailing: false,
          }),
        ),
      ).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });

      expectObservable(
        source$.pipe(
          throttleTime(1500, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('2000ms a 999ms (b|)', {
        a: 2,
        b: 5,
      });

      expectObservable(
        source$.pipe(
          throttleTime(1500, undefined, {
            leading: true,
            trailing: true,
          }),
        ),
      ).toBe('500ms a 1499ms (bc) 996ms (d|)', {
        a: 0,
        b: 2,
        c: 3,
        d: 5,
      });
    });
  });

  // 如果 { trailing: true },
  // 对于 throttleTime() 来说, 如果上游完结的时候, 计时还没停止, 则最后一个数据会被吐出,
  // 对于 throttle() 来说,     如果上游完结的时候, 计时还没停止, 则最后一个数据不会吐出
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttle(() => timer(1500), {
            leading: true,
            trailing: false,
          }),
        ),
      ).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 3,
      });

      expectObservable(
        source$.pipe(
          throttle(() => timer(1500), {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('2000ms a 999ms |', {
        a: 2,
      });

      expectObservable(
        source$.pipe(
          throttle(() => timer(1500), {
            leading: true,
            trailing: true,
          }),
        ),
      ).toBe('500ms a 1499ms b 999ms |', {
        a: 0,
        b: 2,
      });
    });
  });
});
