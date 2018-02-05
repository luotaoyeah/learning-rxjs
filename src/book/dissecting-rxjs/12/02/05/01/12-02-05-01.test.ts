import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { map } from "rxjs/operators";

describe("12-02-05-01", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;

      const source$: ColdObservable<string> = cold("--a--b--|");
      const expectedMarbles: string = "--a--b--|";

      expectObservable(source$).toBe(expectedMarbles);
    });
  });

  it("should map()", () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;

      const source$: ColdObservable<number> = cold("--a--b--|", {
        a: 1,
        b: 2,
      });
      const expectedMarbles: string = "--a--b--|";

      expectObservable(source$.pipe(map(i => i * 2))).toBe(expectedMarbles, {
        a: 2,
        b: 4,
      });
    });
  });
});
