import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { source$ } from "./02-02-08";

describe("src/book/dissecting-rxjs/02/02/08/02-02-08.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(source$).toBe("(a|)", {
        a: 9,
      });
    });
  });
});
