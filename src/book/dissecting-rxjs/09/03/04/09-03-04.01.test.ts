import { TestScheduler } from "rxjs/testing";
import { of, range } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

describe("src/book/dissecting-rxjs/09/03/04/09-03-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * finalize() 会在上游的 observable 完结或者出错时, 执行对应的回调函数
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
        catchError(() => of(8)),
        finalize(() => {
          console.log("FINALLY");
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
