import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { EMPTY, throwError } from "rxjs";

describe("12-02-05-02", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * - 表示时间的流逝, 一个 - 表示一帧, 即一毫秒
   */
  it("should work with -", () => {
    scheduler.run(() => {
      const time: number = scheduler.createTime("-----|");

      expect(time).toEqual(5);
    });
  });

  it("should work with - 02", () => {
    scheduler.run(() => {
      // @ts-ignore
      TestScheduler.frameTimeFactor = 10;
      const time: number = scheduler.createTime("-----|");
      expect(time).toEqual(50);
      // @ts-ignore
      TestScheduler.frameTimeFactor = 1;
    });
  });

  /*
   * | 表示 Subscriber.complete(),
   * 如果只有一个 |, 表示 EMPTY,
   * 即该 observable 不推送数据, 直接调用 complete() 接收
   */
  it("should work with |", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(EMPTY).toBe("|");
    });
  });

  /*
   * # 表示 Subscriber.error(),
   * 如果只有一个 #, 表示 throwError(),
   * 即该 observable 不推送数据, 直接抛出一个错误
   */
  it("should work with #", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(throwError("error")).toBe("#");
    });
  });
});
