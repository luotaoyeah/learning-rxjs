import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { exhaust, take, window } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/05/08-03-05.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * window() 接收一个 notifier$, 每当 notifier$ 吐出一个数据时或者 notifier$ 完结时, 就会结束上一个区块并立即开始下一个区块
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        window(timer(0, 400).pipe(take(2))),
      );

      expectObservable(source$.pipe(exhaust())).toBe(
        "100ms a 99ms b 99ms c 99ms |",
        {
          a: 0,
          b: 1,
          c: 2,
        },
      );
    });
  });
});
