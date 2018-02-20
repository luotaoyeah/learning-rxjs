import { TestScheduler } from "rxjs/testing";
import { interval, of } from "rxjs";
import { take, takeLast } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/04/07-01-04.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * takeLast() 表示从数据流中取后 n 个数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(takeLast(2));

      expectObservable(source$).toBe("(ab|)", { a: 4, b: 5 });
    });
  });

  /*
   * 对于异步数据, takeLast() 会在上游的 observable 完结之后, 一次性吐出所有数据
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(5),
        takeLast(2),
      );

      expectObservable(source$).toBe("5s (ab|)", { a: 3, b: 4 });
    });
  });
});
