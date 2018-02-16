import { TestScheduler } from "rxjs/testing";
import { combineLatest, timer } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/04/05-01-04.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 如果 combineLatest() 的上游 source01$ 和 source02$ 又同时依赖了一个 original$, 这样就形成了菱形依赖,
   * 这时候可能会出现期望之外的结果
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const original$ = timer(0, 1000).pipe(take(3));
      const source01$ = original$.pipe(map(i => `${i}A`));
      const source02$ = original$.pipe(map(i => `${i}B`));

      const source$ = combineLatest([source01$, source02$]);

      expectObservable(source$).toBe("a 999ms (bc) 996ms (de|)", {
        a: ["0A", "0B"],
        b: ["1A", "0B"],
        c: ["1A", "1B"],
        d: ["2A", "1B"],
        e: ["2A", "2B"],
      });
    });
  });
});
