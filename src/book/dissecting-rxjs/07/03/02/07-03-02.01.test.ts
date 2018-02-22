import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { elementAt, filter } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/03/02/07-03-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * elementAt() 表示只获取指定索引的数据, 可以通过第二个参数指定默认数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5);

      expectObservable(source$.pipe(elementAt(3))).toBe("(a|)", {
        a: 4,
      });

      expectObservable(source$.pipe(elementAt(5, 9))).toBe("(a|)", {
        a: 9,
      });

      /*
       * 可以通过 filter() 来模拟 elementAt()
       */
      expectObservable(
        source$.pipe(filter((value, index) => index === 3)),
      ).toBe("(a|)", {
        a: 4,
      });
    });
  });
});
