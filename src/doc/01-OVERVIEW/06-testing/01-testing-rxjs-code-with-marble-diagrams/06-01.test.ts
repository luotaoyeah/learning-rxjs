import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { throttleTime } from "rxjs/operators";

describe("06-01", () => {
  const scheduler = new TestScheduler(() => {
    /*  */
  });

  it("should work", () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable, expectSubscriptions } = helpers;

      const observable01: ColdObservable<string> = cold("-a--b--c---|");
      const subs: string = "^----------!";
      const expected: string = "-a-----c---|";

      expectObservable(observable01.pipe(throttleTime(3, scheduler))).toBe(
        expected,
      );
      expectSubscriptions(observable01.subscriptions).toBe(subs);
    });
  });
});
