import { TestScheduler } from "rxjs/testing";
import { combineLatest, interval } from "rxjs";
import { map, take, withLatestFrom } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/06/05-01-06.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * combineLatest() 的多重依赖问题, 可以使用 withLatestFrom() 来解决
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const original$ = interval(1000).pipe(take(3));
      const source01$ = original$.pipe(map(i => `${i}A`));
      const source02$ = original$.pipe(map(i => `${i}B`));

      const source$ = combineLatest([source01$, source02$]);
      expectObservable(source$).toBe("1s a 999ms (bc) 996ms (de|)", {
        a: ["0A", "0B"],
        b: ["1A", "0B"],
        c: ["1A", "1B"],
        d: ["2A", "1B"],
        e: ["2A", "2B"],
      });

      expectObservable(source01$.pipe(withLatestFrom(source02$))).toBe(
        "1s a 999ms b 999ms (c|)",
        {
          a: ["0A", "0B"],
          b: ["1A", "1B"],
          c: ["2A", "2B"],
        },
      );
    });
  });
});
