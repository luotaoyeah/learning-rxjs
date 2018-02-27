import { TestScheduler } from "rxjs/testing";
import { of, range } from "rxjs";
import { catchError, map } from "rxjs/operators";

describe("src/book/dissecting-rxjs/09/03/01/09-03-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 如果数据在流动的过程中产生了异常, 这个异常会顺着管道流向下游, 并最终流给 observer 对象, 并最终执行 Observer.error() 方法
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
      );

      expectObservable(source$).toBe(
        "(abc#)",
        {
          a: 1,
          b: 4,
          c: 9,
        },
        new Error("Ⅳ"),
      );
    });
  });

  /*
   * catchError() 是一个特殊的操作符, 它会捕获流过它的错误对象, 并且返回一个新的 observable 对象, 记为 selector$, selector$ 用来对上游的数据进行恢复
   */
  it("should work with #catchError()", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map(i => {
          if (i === 4) {
            throw new Error("Ⅳ");
          }

          return i * i;
        }),
        catchError(() => {
          return of(8);
        }),
      );

      expectObservable(source$).toBe("(abcd|)", {
        a: 1,
        b: 4,
        c: 9,
        d: 8,
      });
    });
  });
});
