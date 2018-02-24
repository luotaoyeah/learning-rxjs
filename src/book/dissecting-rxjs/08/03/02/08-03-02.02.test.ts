import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { bufferCount, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/02/08-03-02.02.ts", () => {
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
        bufferCount(4),
      );
      expectObservable(source$).toBe("400ms a 399ms b 199ms (c|)", {
        a: [0, 1, 2, 3],
        b: [4, 5, 6, 7],
        c: [8, 9],
      });
    });
  });
});
