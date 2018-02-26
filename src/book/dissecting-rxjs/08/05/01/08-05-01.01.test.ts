import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { groupBy, mergeAll, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/05/01/08-05-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * groupBy() 用来对上游的数据进行分组,
   * 通过第一个参数来设置分组规则, 决定了分组的 key, 如果这个 key 的 inner observable 已经存在, 则直接让这个 inner observable 吐出该数据,
   * 如果这个 key 的 inner observable 尚不存在, 则创建一个新的 inner observable, 并让它吐出该数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(6),
        groupBy(i => i % 2, i => `${i % 2}-${i}`),
      );

      expectObservable(source$.pipe(mergeAll())).toBe(
        "100ms a 99ms b 99ms c 99ms d 99ms e 99ms (f|)",
        {
          a: "0-0",
          b: "1-1",
          c: "0-2",
          d: "1-3",
          e: "0-4",
          f: "1-5",
        },
      );
    });
  });
});
