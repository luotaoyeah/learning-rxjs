import { TestScheduler } from "rxjs/testing";
import { race, timer } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/07/05-01-07.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * race() 用来选择最先吐出第一个数据的 observable 作为最终的 observable 对象,
   * 只要有一个 observable 吐出了数据, 其余的 observable 就会被退订
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(3));
      const source02$ = timer(500, 500);

      const source$ = race(source01$, source02$);

      expectObservable(source$).toBe("a 999ms b 999ms (c|)", {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
