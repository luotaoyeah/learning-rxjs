import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { bufferToggle, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/04/08-03-04.02.ts", () => {
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
        bufferToggle(timer(0, 400), value => {
          if (value % 2 === 0) {
            return timer(200);
          } else {
            return timer(100);
          }
        }),
      );

      expectObservable(source$).toBe("200ms a 299ms b 499ms (c|)", {
        a: [0],
        b: [3],
        c: [7, 8],
      });
    });
  });
});
