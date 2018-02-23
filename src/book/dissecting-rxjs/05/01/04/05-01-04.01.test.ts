import { TestScheduler } from "rxjs/testing";
import { combineLatest, of, timer } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/04/05-01-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * combineLatest() 操作符用来合并最新的数据,
   * 和 zip() 类似, combineLatest() 需要取每个 observable 中的数据来配对,
   * 什么时候进行配对? 当某个 observable 吐出数据时, 就会去配对, 配对的时候取的数据是每个 observable 中的最后一个数据,
   * 什么时候完结? 当所有的 observable 都完结之后, 最终的 observable 才会完结
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(1000, 1000).pipe(
        take(3),
        map(i => `${i}A`),
      );
      const source02$ = timer(500, 1000).pipe(
        take(2),
        map(i => `${i}B`),
      );
      const source$ = combineLatest([source01$, source02$]);
      expectObservable(source$).toBe("1s a 499ms b 499ms c 999ms (d|)", {
        a: ["0A", "0B"],
        b: ["0A", "1B"],
        c: ["1A", "1B"],
        d: ["2A", "1B"],
      });
    });
  });

  /*
   * combineLatest() 对于同步数据如何处理?
   * 由于 combineLatest() 是依次对上游 observable 进行订阅,
   * 当它订阅第二个 observable 的时候, 第一个 observable 已经完结了, 此时第一个 observable 的最新数据永远是最后一个数据
   */
  it("should work sync observable", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = of(1, 2, 3);
      const source02$ = of("a", "b", "c");

      const source$ = combineLatest([source01$, source02$]);
      expectObservable(source$).toBe("(abc|)", {
        a: [3, "a"],
        b: [3, "b"],
        c: [3, "c"],
      });
    });
  });
});
