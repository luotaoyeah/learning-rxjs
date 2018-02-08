import { throttleTime } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

/*
 * TODO
 */
describe("src/book/dissecting-rxjs/02/02-02/02-02-06/02-02-06.ts", () => {
  // tslint:disable-next-line:no-empty
  const scheduler = new TestScheduler((actual, expected) => {});

  it("marble testing should work", () => {
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
