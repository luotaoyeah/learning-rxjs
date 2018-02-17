import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, mergeAll, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/02/05-02-02.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * mergeAll() 类似于 merge(), 它的上游数据来自一个高阶 observable 突出的 observable 数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map(i =>
          interval(1500).pipe(
            take(2),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(mergeAll());

      expectObservable(source$).toBe("2500ms a 999ms b 499ms c 999ms (d|)", {
        a: "0-0",
        b: "1-0",
        c: "0-1",
        d: "1-1",
      });
    });
  });
});
