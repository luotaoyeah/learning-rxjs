import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, take, zipAll } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/02/05-02-02.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

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

      const source$ = ho$.pipe(zipAll());

      expectObservable(source$).toBe("3.5s a 1499ms (b|) ", {
        a: ["0-0", "1-0"],
        b: ["0-1", "1-1"],
      });
    });
  });

  /*
   * 需要注意的是, 只有当 high order observable 完结之后, zipAll() 才能确定它的上游 observable 的个数,
   * 此时, zipAll() 才会对所有的上游 observable 进行订阅
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map(i =>
          interval(500).pipe(
            take(3),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(zipAll());

      expectObservable(source$).toBe("2.5s a 499ms b 499ms (c|) ", {
        a: ["0-0", "1-0"],
        b: ["0-1", "1-1"],
        c: ["0-2", "1-2"],
      });
    });
  });
});
