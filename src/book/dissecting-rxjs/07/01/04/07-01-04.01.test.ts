import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/04/07-01-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * take() 表示从数据流中取前 n 个数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(take(2));

      expectObservable(source$).toBe("(ab|)", { a: 1, b: 2 });
    });
  });
});
