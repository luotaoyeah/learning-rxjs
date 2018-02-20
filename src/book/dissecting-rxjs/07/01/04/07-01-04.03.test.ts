import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/04/07-01-04.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * takeWhile() 用来截取数据直到某个数据不满足条件为止
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(takeWhile(i => i < 3));

      expectObservable(source$).toBe("1s a 999ms b 999ms c 999ms |", {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });

  /*
   * 可以配置是否吐出最后一个不满足条件的数据
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(takeWhile(i => i < 3, true));

      expectObservable(source$).toBe("1s a 999ms b 999ms c 999ms (d|)", {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });
    });
  });
});
