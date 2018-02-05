import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

describe("12-02-01-01", () => {
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
      const expected: string = "--a--b--|";

      expectObservable(source$).toBe(expected);
    });
  });
});
