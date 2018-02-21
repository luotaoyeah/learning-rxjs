import { TestScheduler } from "rxjs/testing";
import { concat, of, timer } from "rxjs";
import { distinct, mapTo } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinct() 表示对上游的 observable 产生的相同的数据只取一次
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        of(0),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(2)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(3)),
        timer(1000).pipe(mapTo(3)),
      );

      expectObservable(source$.pipe(distinct())).toBe(
        "a 999ms b 1999ms c 3999ms d 999ms |",
        { a: 0, b: 1, c: 2, d: 3 },
      );
    });
  });
});
