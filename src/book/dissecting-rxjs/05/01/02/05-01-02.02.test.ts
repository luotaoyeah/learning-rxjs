import { TestScheduler } from "rxjs/testing";
import { interval, merge } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/02/05-01-02.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * merge() 可以合并任意个 observable 对象, 但是可以通过参数控制**同时**允许多少个 observable 对象进行合并,
   * 如下, 期望合并 3 个 observable 对象, 但是指定了同时只能合并 2 个,
   * 因此在最开始的时候, 只对 source01$ 和 source02$ 进行了订阅,
   * 在第 3 秒的时候, source01$ 完结了, 此时才会去订阅 source03$
   */
  it("should work with concurrent", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(
        take(3),
        map(i => `${i}A`),
      );
      const source02$ = interval(2000).pipe(
        take(2),
        map(i => `${i}B`),
      );
      const source03$ = interval(500).pipe(
        take(2),
        map(i => `${i}C`),
      );

      const source$ = merge(source01$, source02$, source03$, 2);
      expectObservable(source$).toBe(
        "1s a 999ms (bc) 996ms d 499ms e 499ms (fg|) ",
        {
          a: "0A",
          b: "0B",
          c: "1A",
          d: "2A",
          e: "0C",
          f: "1B",
          g: "1C",
        },
      );
    });
  });
});
