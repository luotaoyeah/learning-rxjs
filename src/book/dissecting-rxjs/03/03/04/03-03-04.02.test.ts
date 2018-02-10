import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { filter, map } from "rxjs/operators";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/03/03/04/03-03-04.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * map 操作符是从 `rxjs/operators` 模块导入的
   *
   * Observable.pipe() 方法是 Observable 类上的实例方法, 用来替代以前的 let() 方法
   */
  it("should work with #pipe()", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2, 3).pipe(map(v => v * v));
      expectObservable(source$).toBe("(abc|)", {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });

  /*
   * pipe() 方法可以接受多个 operator 参数, 实现管道的效果
   */
  it("should work with multiple operators", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2, 3).pipe(
        filter(v => v % 2 === 0),
        map(v => v * v),
      );

      expectObservable(source$).toBe("(a|)", {
        a: 4,
      });
    });
  });
});
