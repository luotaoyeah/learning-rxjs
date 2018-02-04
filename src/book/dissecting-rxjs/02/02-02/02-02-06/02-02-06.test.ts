import { throttleTime } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";

/*
 * TODO
 */
describe("02-02-06", () => {
  // tslint:disable-next-line:no-empty
  const scheduler = new TestScheduler((actual, expected) => {});

  it("marble testing should work", () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const observable01 = cold("-a--b--c---|");
      const subs = "^----------!";
      const expected = "-a-----c---|";

      expectObservable(observable01.pipe(throttleTime(3, scheduler))).toBe(
        expected,
      );
      expectSubscriptions(observable01.subscriptions).toBe(subs);
    });
  });
});
