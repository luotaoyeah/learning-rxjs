import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/03/03/04/03-03-04.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work with #pipe()", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2, 3).pipe(map(v => v * v));
      expectObservable(source$).toBe("(abc|)", {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
