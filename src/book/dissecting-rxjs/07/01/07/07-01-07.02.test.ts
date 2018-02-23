import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { skipUntil, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/07/07-01-07.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * skipUntil() 表示一直跳过数据, 直到参数 notifier$ 吐出第一个数据为止
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(5),
        skipUntil(timer(2500)),
      );
      expectObservable(source$).toBe("3s a 999ms b 999ms (c|)", {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });
});
