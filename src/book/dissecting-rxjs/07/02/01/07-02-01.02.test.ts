import { TestScheduler } from "rxjs/testing";
import { concat, interval, timer } from "rxjs";
import { debounceTime, map, take, throttleTime } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/01/07-02-01.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * debounceTime() 接受一个参数 dueTime,
   * 它的的工作原理是:
   *   接收到数据之后, 将该数据设置为"最新数据", 并不会马上把这个数据吐给下游, 而是开始计时, 在 dueTime 时间之内如果有新的数据来,
   *   就将新的数据设置为"最新数据", 并重新开始计时, 直到在 dutTime 时间之内没有新的数据来, 就将"最新数据"吐给下游, 然后重复上述步骤
   *
   * 注意, 如果最后一个"最新数据"的计时还没结束时上游就完结了, 则这个"最新数据"也会吐出
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        interval(600).pipe(
          take(2),
          map(i => `${i}A`),
        ),
        timer(1200, 600).pipe(
          take(2),
          map(i => `${i}B`),
        ),
      );

      expectObservable(source$).toBe("600ms a 599ms b 1199ms c 599ms (d|)", {
        a: "0A",
        b: "1A",
        c: "0B",
        d: "1B",
      });

      expectObservable(source$.pipe(debounceTime(1000))).toBe(
        "2200ms b 799ms (d|)",
        {
          b: "1A",
          d: "1B",
        },
      );

      expectObservable(source$.pipe(throttleTime(1000))).toBe(
        "600ms a 1799ms c 599ms | ",
        {
          a: "0A",
          c: "0B",
        },
      );
    });
  });
});
