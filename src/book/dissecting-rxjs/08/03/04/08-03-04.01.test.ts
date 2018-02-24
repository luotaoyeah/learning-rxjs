import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { exhaust, take, windowToggle } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/04/08-03-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * windowWhen() 是通过一个 observable 来控制区块什么时候结束, 并且上一个区块结束之后, 会立刻开始下一个区块,
   * windowToggle() 首先通过一个 opening$ 来控制区块什么时候开始, opening$ 每吐出一个数据, 就开始一个新的区块,
   *   区块开始之后, 会立即调用 closingSelector() 获取一个 closing$, closing$ 吐出第一个数据或者完结时, 这个区块就会结束,
   *   并且 opening$ 吐出的数据会作为参数传给 closingSelector()
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        windowToggle(timer(0, 400), value => {
          if (value % 2 === 0) {
            return timer(200);
          } else {
            return timer(100);
          }
        }),
      );

      expectObservable(source$.pipe(exhaust())).toBe(
        "100ms a 299ms b 399ms c 99ms d 99ms |",
        {
          a: 0,
          b: 3,
          c: 7,
          d: 8,
        },
      );
    });
  });
});
