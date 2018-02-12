import { TestScheduler } from "rxjs/testing";
import { from } from "rxjs";

describe("src/book/dissecting-rxjs/04/03/02/04-03-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * from() 可以将一个数组的元素转化为一个 observable 数据流
   */
  it("should work with array", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(from([1, 2, 3])).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  /*
   * from() 可以将一个类数组对象转化为一个 observable 数据流
   */
  it("should work with array-like object", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        from({
          0: 1,
          1: 2,
          2: 3,
          length: 3,
        }),
      ).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
