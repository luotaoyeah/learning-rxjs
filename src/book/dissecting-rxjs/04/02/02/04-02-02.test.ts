import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { of } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/02/04-02-02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * of 操作符用来从多个数值创建一个 observable 对象,
   * 其中, 每一个数值会成为一个 next() 推送的数据, 并且这些数据都是同步推送的, 即没有时间上的间隔,
   * 所有的数值推送完了之后, 就会调用 complete
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(of(1, 2, 3)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
