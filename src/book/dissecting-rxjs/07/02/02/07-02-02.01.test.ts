import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { auditTime, take, throttleTime } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/02/07-02-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * auditTime() 就相当于 throttleTime() 设置了 { leading: false, trailing: true },
   * 但是也有一个区别:
   *   对于 throttleTime(), 如果在完结的时候, 还有一个关闸时间窗口没有结束, 则这个时间窗口中的最后一个数据会被吐出
   *   对于 auditTime(), 最后一个数据不会吐出
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe("1600ms a 1199ms b 799ms (c|)", {
        a: 1,
        b: 3,
        c: 5,
      });

      expectObservable(source$.pipe(auditTime(1000))).toBe(
        "1600ms a 1199ms b 799ms |",
        {
          a: 1,
          b: 3,
        },
      );
    });
  });
});
