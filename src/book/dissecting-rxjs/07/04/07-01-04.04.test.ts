import { TestScheduler } from "rxjs/testing";
import { defer, interval, of, throwError, timer } from "rxjs";
import { delay, map, takeUntil } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/04/07-01-04.04.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * takeUntil() 类似于 repeatWhen(), 接受一个 observable 对象, 记为 notifier$,
   * 当 notifier$ 吐出第一个数据, 或者直接完结时, takeUntil() 就会停止截取上游数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(takeUntil(timer(2500)));

      expectObservable(source$).toBe("1s a 999ms b 499ms |", { a: 0, b: 1 });
    });
  });

  /*
   * 如果 notifier$ 抛出一个错误, 则 takeUntil() 也会把错误吐给下游
   */
  it("should throw", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(takeUntil(throwError("ERR")));
      expectObservable(source$).toBe("#", undefined, "ERR");
    });
  });
});
