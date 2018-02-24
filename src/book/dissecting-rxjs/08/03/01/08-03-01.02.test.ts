import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { bufferTime, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/03/01/08-03-01.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * bufferTime() 是将多个上游的数据放在一个数组中, 然后在时间块结束的时候, 将这个数组一次性吐给下游,
   * 在一个时间块开始之后, 每当上游吐出一个数据, 就把这个数据存入这个时间块的数组中, 当时间块结束时, 就将这个数组吐给下游
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        bufferTime(400),
      );

      /*
       * bufferTime() 和 windowTime() 一个类似的地方在于, 如果在时间块结束的时候刚好有上游数据来, 则这个数据会进入下一个时间块,
       * 因为这个时间块会先完结
       */
      expectObservable(source$).toBe("400ms a 399ms b 199ms (c|)", {
        a: [0, 1, 2],
        b: [3, 4, 5, 6],
        c: [7, 8, 9],
      });
    });
  });

  /*
   * bufferTime() 的第二个参数表示, 每个时间块的开始时刻之间的间隔时间, 默认跟时间块的持续时间一样(即一个时间块紧接着一个时间块)
   */
  it("should work with #bufferCreationInterval", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        bufferTime(400, 200),
      );

      expectObservable(source$).toBe("400ms a 199ms b 199ms c 199ms (def|)", {
        a: [0, 1, 2],
        b: [1, 2, 3, 4],
        c: [3, 4, 5, 6],
        d: [5, 6, 7, 8],
        e: [7, 8, 9],
        f: [9],
      });
    });
  });

  /*
   * bufferTime() 第三个参数表示, 每个时间块的数组中最多可以存放多上个数据, 当数据达到这个上限时, 时间块就会立即将这个数据吐给下游
   */
  it("should work with #maxBufferSize", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(10),
        bufferTime(400, 200, 2),
      );

      expectObservable(source$).toBe(
        "200ms a 99ms b 199ms c 199ms d 199ms e 99ms (f|)",
        {
          a: [0, 1],
          b: [1, 2],
          c: [3, 4],
          d: [5, 6],
          e: [7, 8],
          f: [9],
        },
      );
    });
  });
});
