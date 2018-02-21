import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { distinct, map } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinct() 在比较相等性的时候, 默认使用的是 === 来比较, 可以通过参数指定如何进行相等性的比较
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
    });
  });
});
