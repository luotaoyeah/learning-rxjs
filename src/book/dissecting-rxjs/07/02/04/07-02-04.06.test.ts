import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
} from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.06.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinctUntilKeyChanged() 是 distinctUntilChanged() 的一个特例, 表示判断相等性的时候, 判断的是指定的这个属性的值是否相等
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
          distinctUntilKeyChanged("k"),
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
