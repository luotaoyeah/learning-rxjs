import { TestScheduler } from "rxjs/testing";
import { of, range, throwError } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

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

  /*
   * catchError() 参数函数的第二个参数 caught$ 表示上游产生错误的那个 observable 对象,
   * 如果我们直接返回这个 caught$ 对象, 表示对这个 observable 对象进行重试
   */
  it("should work with #catchError() 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map(i => {
          if (i === 4) {
            throw new Error("Ⅳ");
          }

          return i * i;
        }),
        catchError((err, caught) => {
          return caught;
        }),
        take(10),
      );

      expectObservable(source$).toBe("(abcdefghij|)", {
        a: 1,
        b: 4,
        c: 9,
        d: 1,
        e: 4,
        f: 9,
        g: 1,
        h: 4,
        i: 9,
        j: 1,
      });
    });
  });

  /*
   * 可以在 catchError() 中抛出一个新的错误
   */
  it("should work with #catchError() 03", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map(i => {
          if (i === 4) {
            throw new Error("");
          }

          return i * i;
        }),
        catchError(() => throwError(new Error("④"))),
      );

      expectObservable(source$).toBe(
        "(abc#)",
        {
          a: 1,
          b: 4,
          c: 9,
        },
        new Error("④"),
      );
    });
  });
});
