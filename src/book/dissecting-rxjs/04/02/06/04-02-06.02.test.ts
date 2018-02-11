import { TestScheduler } from "rxjs/testing";
import { throwError } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/06/04-02-06.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * throwError 操作符用来直接抛出一个错误, 不会推送任何数据
   *
   * 类似于 Promise.reject() 方法
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(throwError("ERR01")).toBe("#", null, "ERR01");
    });
  });
});
