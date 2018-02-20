import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { take, throttleTime } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/01/07-02-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * throttleTime() 接受一个 duration 参数, 表示在 duration 这个时间范围内, 只能给下游吐一个数据, 多余的数据会被丢弃,
   * 它的工作原理是:
   *   接受到数据, 将数据吐给下游, 立即关闭通道, 并开始计时, 在 duration 时间范围内上游吐出的数据都会被丢弃,
   *   时间到了之后, 停止计时, 并打开通道, 等待新的数据, 一旦接收到新的数据之后, 就又重复上面的步骤
   *
   * throttleTime() 吐出数据的节奏跟上游的节奏是一样的
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(
        take(6),
        throttleTime(1000),
      );

      expectObservable(source$).toBe("600ms a 1199ms b 1199ms c 599ms |", {
        a: 0,
        b: 2,
        c: 4,
      });
    });
  });
});
