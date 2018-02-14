import { TestScheduler } from "rxjs/testing";
import { repeatWhen, take } from "rxjs/operators";
import { interval } from "rxjs";

describe("src/book/dissecting-rxjs/04/03/07/04-03-07.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * repeatWhen() 的上游数据可以是异步数据
   */
  it("should work", () => {
    const source$ = interval(2000).pipe(take(2));
    const notifier$ = interval(1000);
    const repeatWhen$ = source$.pipe(repeatWhen(() => notifier$));

    scheduler.run(({ expectObservable }) => {
      expectObservable(source$).toBe("2s a 1999ms (b|)", { a: 0, b: 1 });

      /*
       * TODO 这里吐出的数据为什么是这样的? 需要进一步研究
       */
      expectObservable(repeatWhen$.pipe(take(4))).toBe(
        "2s a 1999ms b 2999ms c 999ms (d|)",
        {
          a: 0,
          b: 1,
          c: 0,
          d: 0,
        },
      );
    });
  });
});
