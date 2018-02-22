import { TestScheduler } from "rxjs/testing";
import { concat, of, timer } from "rxjs";
import { distinct, distinctUntilChanged, mapTo } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.04.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinct() 是保证所有的数据不重复,
   * distinctUntilChanged() 是保证本次的数据跟上次的数据不重复
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

      expectObservable(source$.pipe(distinctUntilChanged())).toBe(
        "a 999ms b 1999ms c 999ms d 1999ms e 999ms f 999ms |",
        {
          a: 0,
          b: 1,
          c: 2,
          d: 0,
          e: 1,
          f: 3,
        },
      );
    });
  });
});
