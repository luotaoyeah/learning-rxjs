import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import {
  combineAll,
  count,
  elementAt,
  exhaust,
  skip,
  take,
  windowTime,
  zipAll,
} from "rxjs/operators";

/*
 * 回压控制(back-pressure)有两种方式: 有损和无损,
 * 其中几个过滤类操作符属于有损: throttle/throttleTime/debounce/debounceTime/audit/auditTime/sample/sampleTime
 * 无损的操作符有两类:
 *     一类是将上游的多个数据放到一个数组中, 再传给下游, 这类操作符包括: buffer/bufferTime/bufferCount/bufferWhen/bufferToggle
 *     一类是将上游的多个数据放到一个 observable 中, 再传给下游, 这类操作符包括: window/windowTime/windowCount/windowWhen/windowToggle
 */
describe("src/book/dissecting-rxjs/08/03/01/08-03-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * windowTime() 将时间分成多个时间块, 在每个时间块的开始时刻, 会给下游吐一个 observable 对象, 记为 span$,
   * 在这个时间块中, 每当上游有数据来时, 就会通过这个 span$ 将数据吐给下游
   *
   * windowTime() 的第一个参数, 表示每个时间块的持续时间
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        windowTime(400),
        count(),
      );

      expectObservable(source$).toBe("1s (a|)", {
        a: 3,
      });
    });
  });
});
