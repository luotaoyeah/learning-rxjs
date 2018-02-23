import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, pluck, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/02/03/08-02-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * pluck() 表示截取上游数据的某个属性的值
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(3),
        map(i => ({ k: i, v: `${i}A` })),
      );

      /*
       * pluck() 的参数表示属性的名称
       */
      expectObservable(source$.pipe(pluck("v"))).toBe(
        "1s a 999ms b 999ms (c|)",
        {
          a: "0A",
          b: "1A",
          c: "2A",
        },
      );
    });
  });

  /*
   * 可以获取嵌套属性
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(3),
        map(i => ({ obj: { k: i, v: `${i}A` } })),
      );

      /*
       * pluck() 的参数表示属性的名称, 多个参数表示嵌套属性
       */
      expectObservable(source$.pipe(pluck("obj", "v"))).toBe(
        "1s a 999ms b 999ms (c|)",
        {
          a: "0A",
          b: "1A",
          c: "2A",
        },
      );
    });
  });

  /*
   * 在获取嵌套属性的时候, 如果中间某个属性不存在, 则返回 undefined, 而不会报错
   */
  it("should work 03", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(3),
        map(i => ({ obj: { k: i, v: `${i}A` } })),
      );

      expectObservable(source$.pipe(pluck("obj", "foo", "v"))).toBe(
        "1s a 999ms b 999ms (c|)",
        {
          a: undefined,
          b: undefined,
          c: undefined,
        },
      );
    });
  });
});
