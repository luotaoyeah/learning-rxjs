import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { concatAll, count, exhaust, take, windowTime } from "rxjs/operators";

/*
 * 回压控制(back-pressure)有两种方式: 有损和无损,
 * 其中几个过滤类操作符属于有损: throttle/throttleTime/debounce/debounceTime/audit/auditTime/sample/sampleTime
 * 无损的操作符有两类:
 *     一类是将上游的多个数据放到一个数组中, 再传给下游, 这类操作符包括: buffer/bufferTime/bufferCount/bufferWhen/bufferToggle
 *     一类是将上游的多个数据放到一个 observable 中, 再传给下游, 这类操作符包括: window/windowTime/windowCount/windowWhen/windowToggle
 */
describe("src/book/dissecting-rxjs/08/03/01/08-03-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * windowTime() 将时间分成多个时间块, 在每个时间块的开始时刻, 会给下游吐一个 observable 对象, 记为 span$,
   * 在这个时间块中, 每当上游有数据来时, 就会通过这个 span$ 将数据吐给下游,
   * 第一个时间块是从时刻 0 开始的
   *
   * windowTime() 的第一个参数, 表示每个时间块的持续时间
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        windowTime(400),
        count(),
      );

      expectObservable(source$).toBe("1s (a|)", {
        a: 3,
      });
    });
  });

  /*
   * windowTime() 的第二个参数, 表示时间块开始时刻之间的间隔时间, 默认跟第一个参数值一样(即间隔的时间跟持续的时间一样, 因此时间块是一个接着一个的),
   * 如果第一个参数 windowTimeSpan 大于第二个参数 windowCreationInterval, 则时间块之间有可能会有重复数据,
   * 如果第一个参数 windowTimeSpan 小于第二个参数 windowCreationInterval, 则时间块之间可能会有上游的数据被丢弃
   */
  it("should work with #windowCreationInterval", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(take(10));

      expectObservable(
        source$.pipe(
          windowTime(400),
          count(),
        ),
      ).toBe("1s (a|)", {
        a: 3,
      });

      expectObservable(
        source$.pipe(
          windowTime(400, 200),
          count(),
        ),
      ).toBe("1s (a|)", {
        a: 6,
      });

      /*
       * span$ 是一个 hot observabl, 因此如果两个 span$ 重叠在一起时, 如果使用 concatAll() 操作符,
       * 那么当第一个 span$ 完结的时候, 去订阅第二个 span$ 的时候, 第二个 span$ 已经吐出了一些数据, 这些数据就会丢失
       */
      expectObservable(
        source$.pipe(
          windowTime(400, 200),
          concatAll(),
        ),
      ).toBe(
        "100ms a 99ms b 99ms c 99ms d 99ms e 99ms f 99ms g 99ms h 99ms i 99ms (j|)",
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
          h: 7,
          i: 8,
          j: 9,
        },
      );

      expectObservable(
        source$.pipe(
          windowTime(400, 600),
          count(),
        ),
      ).toBe("1s (a|)", {
        a: 2,
      });

      expectObservable(
        source$.pipe(
          windowTime(400, 600),
          concatAll(),
        ),
      ).toBe("100ms a 99ms b 99ms c 299ms f 99ms g 99ms h 99ms i 99ms |", {
        a: 0,
        b: 1,
        c: 2,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
      });
    });
  });

  it("should work with #maxWindowSize", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(take(10));

      expectObservable(
        source$.pipe(
          windowTime(400, 400, 2),
          exhaust(),
        ),
      ).toBe("100ms a 99ms b 199ms c 99ms d 299ms e 99ms f 99ms |", {
        a: 0,
        b: 1,
        c: 3,
        d: 4,
        e: 7,
        f: 8,
      });
    });
  });
});
