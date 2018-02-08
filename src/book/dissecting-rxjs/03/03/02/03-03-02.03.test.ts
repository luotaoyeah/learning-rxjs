import { fn01 } from "./03-03-02.03";
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/03/03/02/03-03-02.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const observable01$ = of(1, 2, 3).pipe<number>(
        fn01<number, number>()((value: number) => value * 2),
      );

      expect(observable01$).toBeTruthy();

      /*
            expectObservable(observable01$).toBe("(abc|)", {
              a: 2,
              b: 4,
              c: 6,
            });
      */
    });
  });
});
