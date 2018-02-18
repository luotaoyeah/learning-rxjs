import { TestScheduler } from "rxjs/testing";
import { concat, of, timer } from "rxjs";
import { count } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/01/01/06-01-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * count() 用来统计某个 observable 吐出的数据总个数,
   * 只有当上游的 observable 完结之后, count() 才能统计个数从而吐出数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(of(1, 2, 3), of(4, 5, 6));

      expectObservable(source$.pipe(count())).toBe("(a|)", { a: 6 });
    });
  });

  it("should work with async observable", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(timer(1000), timer(1000));

      expectObservable(source$.pipe(count())).toBe("2s (a|)", { a: 2 });
    });
  });
});
