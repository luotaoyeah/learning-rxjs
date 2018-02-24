import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { bufferWhen, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/03/08-03-03.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        bufferWhen(() => timer(500)),
      );

      expectObservable(source$).toBe("500ms a 499ms (bc|)", {
        a: [0, 1, 2, 3],
        b: [4, 5, 6, 7, 8],
        c: [9],
      });
    });
  });
});
