import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/03/03/04/03-03-04.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 新的 tap 操作符以前的名称为 do
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2, 3).pipe(
        tap(v => {
          console.log(v);
        }),
        filter(v => v % 2 === 0),
        map(v => v * v),
      );

      expectObservable(source$).toBe("(a|)", {
        a: 4,
      });
    });
  });
});
