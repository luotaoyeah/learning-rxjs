import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { combineAll, map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/02/05-02-02.04.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * combineAll() 跟 zipAll() 类似, 也需要等到 high order observable 完结之后, 才会开始订阅上游的 observable 对象
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map(i =>
          interval(500).pipe(
            take(2),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(combineAll());

      expectObservable(source$).toBe("2500ms a 499ms (bc|)", {
        a: ["0-0", "1-0"],
        b: ["0-1", "1-0"],
        c: ["0-1", "1-1"],
      });
    });
  });
});
