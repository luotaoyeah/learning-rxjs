import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { take, throttle, throttleTime } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/01/07-02-01.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * throttle() 和 throttleTime() 的区别在于: 打开阀门的时机不一样,
   * throttleTime() 可以看作是 throttle 的一个特例, 即 throttleTime() 是通过时间间隔来控制阀门打开的时机,
   * 而 throttleTime() 是通过一个另外的 observable 来控制时机, 当这个 observable 吐出第一个数据时, 就会打开阀门,
   * 相比之下, throttle() 更加灵活
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(take(6));

      expectObservable(source$.pipe(throttleTime(1000))).toBe(
        "600ms a 1199ms b 1199ms c 599ms |",
        {
          a: 0,
          b: 2,
          c: 4,
        },
      );

      expectObservable(
        source$.pipe(
          throttle(() => {
            return timer(1000);
          }),
        ),
      ).toBe("600ms a 1199ms b 1199ms c 599ms |", {
        a: 0,
        b: 2,
        c: 4,
      });
    });
  });

  /*
   * throttle() 和 throttleTime() 可以接受一个配置参数, 用来配置 heading 和 trailing, 默认为: { heading: true, trailing: false },
   * heading 和 trailing 的含义是什么?
   *   假设 duration 为 1s, throttle() 的工作过程为:
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     接收到数据, 关闭通道 1s 中, 1s 之后打开,
   *     ...
   *
   * 在这个关闭通道 1s 中这个时间内, 上游的 observabl 可能会继续吐出数据, 也就是说在这 1s 中上游的 observable 会吐出多个数据, 那么把哪个数据吐给下游呢?
   *   如果 heading: true 表示把第一个数据吐给下游, 并且是在关闭通道的时刻吐出,
   *   如果 trailing: true 表示把最后一个数据吐给下游, 并且是在打开通道的时刻吐出
   */
  it("should work with trailing", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(600).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe("1600ms a 1199ms b 799ms (c|)", {
        a: 1,
        b: 3,
        c: 5,
      });

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: true,
            trailing: true,
          }),
        ),
      ).toBe("600ms a 999ms b 199ms c 999ms d 199ms e 599ms (f|)", {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
      });
    });
  });
});
