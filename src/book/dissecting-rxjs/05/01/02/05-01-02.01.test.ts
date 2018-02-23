import { TestScheduler } from "rxjs/testing";
import { concat, merge, of, timer } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/02/05-01-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * merge() 跟 concat() 有些类似, 区别在于它会同时订阅所有的上游 observable 对象,
   * 之后只要任何一个有数据吐出, 就会把数据传递给最终的 observable 对象,
   * 而 concat() 会依次订阅每一个 observable 对象, 当上一个 observable 完结时才会订阅下一个 observable 对象
   */
  it("should work with merge()", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(
        take(2),
        map(i => `${i}A`),
      );
      const source02$ = timer(500, 1000).pipe(
        take(2),
        map(i => `${i}B`),
      );

      expectObservable(merge(source01$, source02$)).toBe(
        "a 499ms b 499ms c 499ms (d|)",
        {
          a: "0A",
          b: "0B",
          c: "1A",
          d: "1B",
        },
      );

      expectObservable(concat(source01$, source02$)).toBe(
        "a 999ms b 499ms c 999ms (d|)",
        {
          a: "0A",
          b: "1A",
          c: "0B",
          d: "1B",
        },
      );
    });
  });

  /*
   * 如果上游的 observable 都是同步数据, 则使用 merge() 没有太多意义
   */
  it("should work with sync observable", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(merge(of(1, 2), of(3, 4))).toBe("(abcd|)", {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      });
    });
  });
});
