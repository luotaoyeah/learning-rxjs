import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { distinct, distinctUntilChanged, map } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.05.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinctUntilChanged() 在比较相等性的时候, 默认使用的是 === 来比较, 可以通过参数指定如何进行相等性的比较,
   * distinct() 和 distinctUntilChanged() 的第二个参数都是用来配置如何进行相等性的比较, 但是原理不一样,
   *   对于 distinct(), 函数返回的是个属性的指, 表示在比较的时候, 比较的就是这个属性的值是否相等,
   *   对于 distinctUntilChanged(), 函数返回的直接就是比较的结果
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(
        { k: 0, v: "A" },
        { k: 1, v: "B" },
        { k: 1, v: "C" },
        { k: 2, v: "D" },
      );

      expectObservable(
        source$.pipe(
          distinct(i => i.k),
          map(i => i.v),
        ),
      ).toBe("(abc|)", {
        a: "A",
        b: "B",
        c: "D",
      });

      expectObservable(
        source$.pipe(
          distinctUntilChanged((x, y) => x.k === y.k),
          map(i => i.v),
        ),
      ).toBe("(abc|)", {
        a: "A",
        b: "B",
        c: "D",
      });
    });
  });
});
