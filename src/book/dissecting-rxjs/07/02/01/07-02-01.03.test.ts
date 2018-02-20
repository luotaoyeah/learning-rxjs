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
});
