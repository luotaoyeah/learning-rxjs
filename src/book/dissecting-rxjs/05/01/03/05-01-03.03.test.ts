import { TestScheduler } from "rxjs/testing";
import { interval, of, timer, zip } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/03/05-01-03.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * zip() 可以合并多个 observable 对象,
   * 其最终的 observable 吐出数据的个数, 由吐出数据最少的那个上游 observable 决定
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(take(2));
      const source02$ = of("a", "b", "c");
      const source03$ = timer(500, 1000).pipe(map(i => `${i}C`));

      const source$ = zip(source01$, source02$, source03$);

      expectObservable(source$).toBe("1s a 999ms (b|)", {
        a: [0, "a", "0C"],
        b: [1, "b", "1C"],
      });
    });
  });
});
