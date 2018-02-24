import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { buffer, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/05/08-03-05.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * buffer() 接收一个 notifier$, 每当 notifier$ 吐出一个数据时或者 notifier$ 完结时, 就会结束上一个区块并立即开始下一个区块
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        buffer(timer(0, 400).pipe(take(2))),
      );

      expectObservable(source$).toBe("a 399ms (b|)", {
        a: [],
        b: [0, 1, 2],
      });
    });
  });
});
