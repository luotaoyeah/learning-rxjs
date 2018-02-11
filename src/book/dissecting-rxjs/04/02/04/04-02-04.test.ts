import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { generate, Observable, range } from "rxjs";

describe("src/book/dissecting-rxjs/04/02/04/04-02-04.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * generate 操作符类似于 for 循环, 可以设置: 初始值, 循环条件, 条件的递增, 产生的结果
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = generate<number, number>({
        condition: i => i < 10,
        initialState: 2,
        iterate: i => i + 2,
        resultSelector: i => i * i,
      });

      expectObservable(source$).toBe("(abcd|)", {
        a: 4,
        b: 16,
        c: 36,
        d: 64,
      });
    });
  });

  /*
   * 可以用 generate 来模拟 range 操作符
   */
  it("should simulate #range() with #generate()", () => {
    const myRange = (start: number, count: number): Observable<number> => {
      return generate<number, number>({
        condition: i => i < start + count,
        initialState: start,
        iterate: i => i + 1,
        resultSelector: i => i,
      });
    };

    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source01$ = myRange(1.5, 3);
      const source02$ = range(1.5, 3);

      expectObservable(source01$).toBe("(abc|)", {
        a: 1.5,
        b: 2.5,
        c: 3.5,
      });
      expectObservable(source02$).toBe("(abc|)", {
        a: 1.5,
        b: 2.5,
        c: 3.5,
      });
    });
  });

  /*
   * generate 不仅仅可以用来产生数字类型的值, 还可以产生任意类型的值
   */
  it("should work with non-number value", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = generate<string, string>({
        condition: i => i.length < 4,
        initialState: "x",
        iterate: i => i + "x",
        resultSelector: i => i,
      });
      expectObservable(source$).toBe("(abc|)", {
        a: "x",
        b: "xx",
        c: "xxx",
      });
    });
  });
});
