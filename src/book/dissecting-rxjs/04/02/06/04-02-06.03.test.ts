import { TestScheduler } from "rxjs/testing";
import { NEVER, never, throwError } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/06/04-02-06.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /**
   * never 表示一个永不完结, 永不出错, 永不推送数据的数据流
   * @deprecated
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(never()).toBe("-");
    });
  });

  /*
   * never 操作符已经弃用, 推荐使用新的 NEVER 常量来替代
   */
  it("should work with NEVER", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(NEVER).toBe("-");
    });
  });
});
