import { TestScheduler } from "rxjs/testing";
import { combineLatest, interval, timer } from "rxjs";
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
});
