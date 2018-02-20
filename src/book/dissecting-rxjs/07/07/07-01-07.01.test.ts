import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { skip, skipWhile } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/07/07-01-07.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * skipWhile() 表示跳过数据, 直到某个数据不满足条件时, 终止跳过
   */
  it("should work", () => {
    /*
     * 如下, 当遇到数据 3 时, 不满足条件, 于是后面的所有数据都不再跳过,
     * 即使后面的 2 和 1 也不满足条件, 但是由于已经终止跳过了, 所以它们不会被跳过
     */
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 2, 1).pipe(skipWhile(i => i < 3));
      expectObservable(source$).toBe("(abc|)", {
        a: 3,
        b: 2,
        c: 1,
      });
    });
  });
});
