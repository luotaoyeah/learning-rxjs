import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { find, findIndex } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/02/02/06-02-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * find() 和 findIndex() 类似于 lodash 中的 find() 和 findIndex(),
   * 用来查找第一个满足条件的数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5);

      expectObservable(source$.pipe(find(i => i % 2 === 0))).toBe("(a|)", {
        a: 2,
      });

      expectObservable(source$.pipe(findIndex(i => i % 3 === 0))).toBe("(a|)", {
        a: 2,
      });
    });
  });
});
