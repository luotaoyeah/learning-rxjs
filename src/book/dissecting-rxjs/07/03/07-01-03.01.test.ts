import { TestScheduler } from "rxjs/testing";
import { interval, of } from "rxjs";
import { first, last, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/03/07-01-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * last() 和 first() 相反, 用来查找最后一个满足条件的数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(last(i => i % 2 === 0));

      expectObservable(source$).toBe("(a|)", { a: 4 });
    });
  });

  /*
   * last() 会等到上游的 observable 完结之后, 才会吐出数据
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(5),
        last(i => i % 2 === 0),
      );

      expectObservable(source$).toBe("5s (a|)", { a: 4 });
    });
  });
});
