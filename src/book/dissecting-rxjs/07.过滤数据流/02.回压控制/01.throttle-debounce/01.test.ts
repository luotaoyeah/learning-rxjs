import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { take, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07.过滤数据流/02.回压控制/01.throttle-debounce/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * throttleTime():
   *    1. 接收上游数据, 数据吐给下游, 开始计时.
   *      计时期间丢弃上游数据,
   *   2. 停止计时, 重复步骤 1.
   *
   * 如果停止计时的时刻, 上游刚好吐出数据, 则这个数据会被丢弃吗?
   * 通过下面的测试得知:
   *   1. 如果是通过 interval() 创建的数据源, 则先停止计时, 再接收数据.
   *   2. 如果是通过 cold()     创建的数据源, 则先丢弃数据, 再停止计时.
   */
  it('01', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(6), throttleTime(2000))).toBe('1s a 1999ms b 1999ms c 999ms |', {
        a: 0,
        b: 2,
        c: 4,
      });
    });
  });

  /*
   * throttleTime() 并不是直接将时间均分, 而是在每次接收到一个上游数据时, 才开始一个新的计时期间.
   */
  it('02', () => {
    scheduler.run(({ cold, expectObservable }) => {
      expectObservable(
        cold('1s a 999ms b 1999ms c 999ms d 999ms e 999ms f 999ms g', {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
        }).pipe(take(6), throttleTime(2000)),
      ).toBe('1s a 2999ms b 2999ms (c|)', {
        a: 0,
        b: 2,
        c: 5,
      });
    });
  });

  // 默认配置为: { leading: true, trailing: false },
  //   1. 在开始计时时, 吐出上游数据
  //
  // 如果配置为: { leading: false, trailing: true },
  //   1. 在结束计时时, 吐出计时期间的最后一个上游数据
  //
  // 如果配置为: { leading: true, trailing: true },
  //   1. 在开始计时时, 吐出上游数据
  //   2. 在结束计时时, 吐出计时期间的最后一个上游数据(如果这个数据就是开始吐出的那个数据, 此时不再吐出)
  it('03', () => {
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
});
