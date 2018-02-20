import { TestScheduler } from "rxjs/testing";
import { of, EmptyError } from "rxjs";
import { first } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/01/02/07-01-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * first() 用来查找第一个满足条件的数据, 这时候的用法跟 find() 很像
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(first(i => i % 2 === 0));

      expectObservable(source$).toBe("(a|)", { a: 2 });
    });
  });

  /*
   * 如果没有指定条件, 则直接返回第一个数据
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(first());

      expectObservable(source$).toBe("(a|)", { a: 1 });
    });
  });

  /*
   * 如果找不到满足条件的数据, first() 会抛出一个 EmptyError 错误
   */
  it("should throw if not found", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(first(i => i > 9));

      expectObservable(source$).toBe("#", undefined, new EmptyError());
    });
  });

  /*
   * 可以指定一个默认值, 当找不到满足条件的数据时, 就会吐出这个默认值
   */
  it("should emit the default value", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(1, 2, 3, 4, 5).pipe(first(i => i > 9, 9));

      expectObservable(source$).toBe("(a|)", { a: 9 });
    });
  });
});
