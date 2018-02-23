import { TestScheduler } from "rxjs/testing";
import { concat, interval, of, timer } from "rxjs";
import { distinct, mapTo } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/04/07-02-04.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * distinct() 会在内部维护一个数据集合, 用来记录唯一的数据, 从而保证相同的数据只取一次,
   * 我们可以通过参数, 让这个数据集合在指定的时机进行重置, 参数是一个 observable 对象, 记为 flushes$, 当 flushes$ 吐出第一个数据时, 内部数据集合就会重置
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        of(0),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(2)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(0)),
        timer(1000).pipe(mapTo(1)),
        timer(1000).pipe(mapTo(3)),
        timer(1000).pipe(mapTo(3)),
      );

      expectObservable(source$.pipe(distinct())).toBe(
        "a 999ms b 1999ms c 3999ms d 999ms |",
        { a: 0, b: 1, c: 2, d: 3 },
      );

      expectObservable(source$.pipe(distinct(undefined, interval(3000)))).toBe(
        "a 999ms b 1999ms c 999ms d 1999ms e 999ms f 999ms |",
        { a: 0, b: 1, c: 2, d: 0, e: 1, f: 3 },
      );
    });
  });
});
