import { TestScheduler } from "rxjs/testing";
import { forkJoin, interval, timer } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/09/05-01-09.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * forkJoin() 类似于 Promise.all(),
   * 作用是等待所有的 observable 都完结之后, 将所有 observable 的最后一个数据合并然后吐出
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(take(3));
      const source02$ = timer(500, 1000).pipe(take(9));

      const source$ = forkJoin([source01$, source02$]);

      expectObservable(source$).toBe("8500ms (a|)", {
        a: [2, 8],
      });
    });
  });
});
