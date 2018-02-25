import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, mergeMap, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/04/02/08-04-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * mergeMap() 等价于 map() + mergeAll()
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(2),
        mergeMap(i =>
          interval(100).pipe(
            take(3),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(source$).toBe("200ms a 99ms (bc) 96ms (de) 96ms (f|)", {
        a: "0-0",
        b: "0-1",
        c: "1-0",
        d: "0-2",
        e: "1-1",
        f: "1-2",
      });
    });
  });
});
