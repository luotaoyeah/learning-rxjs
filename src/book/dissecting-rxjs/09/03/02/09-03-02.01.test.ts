import { TestScheduler } from "rxjs/testing";
import { of, range } from "rxjs";
import { catchError, map, retry } from "rxjs/operators";

describe("src/book/dissecting-rxjs/09/03/02/09-03-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * retry() 用来对产生错误的 observable 对象进行重试, 可以指定重试的次数,
   * 很有可能多次重试之后依然会失败, 所以通常需要配合 catchError() 一起使用
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map(i => {
          if (i === 4) {
            throw new Error("Ⅳ");
          }

          return i * i;
        }),
        retry(2),
        catchError(() => of(8)),
      );

      expectObservable(source$).toBe("(abcabcabcd|)", {
        a: 1,
        b: 4,
        c: 9,
        d: 8,
      });
    });
  });
});
