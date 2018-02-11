import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { EMPTY, empty } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/06/04-02-06.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /**
   * empty 操作符用来产生一个直接 complete 的数据流, 不会推送任何数据
   *
   * 类似于 Promise.resolve() 方法
   * @deprecated
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(empty()).toBe("|");
    });
  });

  /*
   * empty 已经弃用, 推荐使用新的 EMPTY 常量来替代
   */
  it("should work with EMPTY", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(EMPTY).toBe("|");
    });
  });
});
