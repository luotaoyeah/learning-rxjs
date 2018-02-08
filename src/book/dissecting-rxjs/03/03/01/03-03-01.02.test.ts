import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { fn01 } from "./03-03-01.02";
import { of } from "rxjs";

describe("src/book/dissecting-rxjs/03/03/01/03-03-01.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const observable01$ = of(1, 2, 3);

      const observable02$ = observable01$.pipe(
        fn01()((value: number) => value * value),
      );

      expectObservable(observable02$).toBe("(abc|)", {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
