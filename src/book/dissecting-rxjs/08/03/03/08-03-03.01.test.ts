import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { count, take, windowWhen } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/03/08-03-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * windowWhen() 是通过一个 observable 来控制区块的开始和结束, 当这个 observable 吐出第一个数据或者完结的时候, 对应的区块就会结束,
   * 当上一个区块结束之后, windowWhen() 就会立即调用函数参数, 返回一个新的 observable, 并立即订阅这个 observable 对象
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(take(10));

      expectObservable(
        source$.pipe(
          windowWhen(() => timer(400)),
          count(),
        ),
      ).toBe("1s (a|)", { a: 3 });

      expectObservable(
        source$.pipe(
          windowWhen(() => timer(600)),
          count(),
        ),
      ).toBe("1s (a|)", { a: 2 });
    });
  });
});
