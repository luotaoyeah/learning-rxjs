import { TestScheduler } from "rxjs/testing";
import { interval, range } from "rxjs";
import { filter, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/07-01-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5);

      expectObservable(source$.pipe(filter(i => i % 2 === 0))).toBe("(ab|)", {
        a: 2,
        b: 4,
      });
    });
  });

  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(take(5));

      expectObservable(source$.pipe(filter(i => i % 2 === 0))).toBe(
        "1s a 1999ms b 1999ms (c|)",
        {
          a: 0,
          b: 2,
          c: 4,
        },
      );
    });
  });
});
