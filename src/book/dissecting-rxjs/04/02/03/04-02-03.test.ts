import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { range } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/03/04-02-03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * range() 操作符用来从一个数字范围创建出一个 observable 对象,
   * 第一个参数表示从哪个数字开始, 第二个参数表示要产生多少个数字,
   * 产生的数字依次递增 1
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(range(2, 3)).toBe("(abc|)", {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });

  /*
   * 产生的数字可以是整数, 也可以是小数
   */
  it("should work with floating-point number", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(range(1.5, 3)).toBe("(abc|)", {
        a: 1.5,
        b: 2.5,
        c: 3.5,
      });
    });
  });
});
