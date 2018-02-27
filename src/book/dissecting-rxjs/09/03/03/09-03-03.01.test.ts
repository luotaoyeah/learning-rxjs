import { TestScheduler } from "rxjs/testing";
import { interval, of, range } from "rxjs";
import { catchError, map, retryWhen, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/09/03/03/09-03-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * retryWhen() 使用一个 observable 对象(记为 nitofier$)来控制重试的次数和节奏, 每当 nitofier$ 吐出一个数据, 就重试一次,
   * 当 nitofier$ 完结的时候, source$ 也会立刻完结
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
        retryWhen(() => interval(1000).pipe(take(2))),
        catchError(() => of(8)),
      );

      expectObservable(source$).toBe("(abc) 995ms (abc) 995ms (abc|)", {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
