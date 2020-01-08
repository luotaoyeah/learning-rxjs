import { TestScheduler } from 'rxjs/testing';
import { concat, interval, timer } from 'rxjs';
import { map, take, throttle, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/01/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // throttle() 使用一个 duration$ 来计时, 当 duration$ 吐出第一个数据时/或者完结时, 停止计时
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

  /*
   * throttle() 和 throttleTime() 可以接受一个配置参数, 用来配置 leading 和 trailing, 默认为: { leading: true, trailing: false },
   * leading 和 trailing 的含义是什么?
   *   假设 duration 为 1s, throttle() 的工作过程为:
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     ...
   *
   * 在这个关闭通道 1s 中这个时间窗口内, 上游的 observable 可能会继续吐出数据, 也就是说在这 1s 中上游的 observable 会吐出多个数据, 那么把哪个数据吐给下游呢?
   *   如果 leading: true 表示把第一个数据吐给下游, 并且是在关闭通道的时刻吐出,
   *   如果 trailing: true 表示把最后一个数据吐给下游, 并且是在打开通道的时刻吐出
   */
  it('should work with trailing', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1600ms a 1199ms b 799ms (c|)', {
        a: 1,
        b: 3,
        c: 5,
      });

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
          }),
        ),
      ).toBe('600ms a 999ms b 199ms c 999ms d 199ms e 599ms (f|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
      });
    });
  });

  /*
   * 当 { leading: false, trailing: true } 时, throttleTime() 和 throttle() 的行为有一些区别:
   *
   * 将 throttle() 的函数参数返回的 observable 记为 throttle$, 那么什么时候会去订阅 throttle$, 什么时候又会退订 throttle$ 呢?
   *   对于 { leading: true, trailing: false }, 当 throttle() 吐出一个数据之后就会去订阅 throttle$, 当 throttle$ 吐出第一个数据之后就会退订,
   *   对于 { leading: false, trailing: true }, 当上游的 observable 吐出第一个数据之后, 就会去订阅 throttle$, 当 throttle$ 吐出第一个数据之后就会退订,
   *     此时, 在退订了 throttle$ 之后, 马上又会去订阅 throttle$, 因此, 对 throttle$ 的订阅和退订是连接在一起的, 一个接一个, 从而使得 throttle() 吐出数据的节奏正好是间隔一样的时间
   *
   * 对于 throttleTime() 来说, 如果上游的 observable 完结的时候, 最后一个时间窗口还没完, 则最后一个时间窗口中的最后一个数据会被吐出,
   * 对于 throttle() 来说, 如果上游的 observable 完结的时候, 最后一个 throttle$ 尚未吐出第一个数据, 则该窗口中的最后一个数据不会吐出
   */
  it('should work with trailing by #throttle()', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1600ms a 1199ms b 799ms (c|)', {
        a: 1,
        b: 3,
        c: 5,
      });

      expectObservable(
        source$.pipe(
          throttle(() => timer(1000), {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1600ms a 999ms b 999ms (c|)', {
        a: 1,
        b: 3,
        c: 4,
      });

      const source02$ = concat(
        interval(600).pipe(
          take(2),
          map((i) => `${i}A`),
        ),
        timer(1500).pipe(map((i) => `${i}B`)),
      );

      expectObservable(
        source02$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1600ms a 1099ms (b|)', {
        a: '1A',
        b: '0B',
      });

      expectObservable(
        source02$.pipe(
          throttle(() => timer(1000), {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1600ms a 1099ms |', {
        a: '1A',
      });
    });
  });
});
