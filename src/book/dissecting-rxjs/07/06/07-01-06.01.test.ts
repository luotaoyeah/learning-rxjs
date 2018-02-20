import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { skip, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/06/07-01-06.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * skip() 表示跳过前 n 个数据, 截取后面的所有数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(5),
        skip(2),
      );

      expectObservable(source$).toBe("3s a 999ms b 999ms (c|)", {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });
});
