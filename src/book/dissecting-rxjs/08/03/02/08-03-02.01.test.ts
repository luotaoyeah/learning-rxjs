import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { count, exhaust, take, windowCount } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/02/08-03-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * windowTime() 是根据持续时间来划分区块, 每个区块持续多少时间,
   * windowCount() 是根据数据个数来进行区块的划分, 每个区块包含多少数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        windowCount(4),
      );

      expectObservable(source$.pipe(count())).toBe("1s (a|)", {
        a: 3,
      });

      expectObservable(source$.pipe(exhaust())).toBe(
        "100ms a 99ms b 99ms c 99ms d 99ms e 99ms f 99ms g 99ms h 99ms i 99ms (j|)",
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
          h: 7,
          i: 8,
          j: 9,
        },
      );
    });
  });
});
