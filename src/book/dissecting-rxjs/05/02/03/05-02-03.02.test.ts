import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { exhaust, map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/03/05-02-03.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * switchAll() 的策略是: 只要有新的 inner observable 产生, 就会去订阅这个新的 inner observable
   * exhaust() 的策略是: 只有在当前订阅的 inner observable 完结之后, 才会去订阅新的 inner observable
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(3),
        map(i =>
          interval(700).pipe(
            take(2),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(exhaust());

      expectObservable(source$).toBe("1700ms a 699ms b 1299ms c 699ms (d|)", {
        a: "0-0",
        b: "0-1",
        c: "2-0",
        d: "2-1",
      });
    });
  });
});
