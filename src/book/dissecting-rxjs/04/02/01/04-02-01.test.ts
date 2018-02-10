import { TestScheduler } from "rxjs/testing";
import { Observable, Subscriber } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/04/02/01/04-02-01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = Observable.create((subscriber: Subscriber<number>) => {
        subscriber.next(1);
        subscriber.complete();
      });

      expectObservable(source$).toBe("(a|)", {
        a: 1,
      });
    });
  });
});
