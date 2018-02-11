import { TestScheduler } from "rxjs/testing";
import { timer } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/04/03/01/04-03-01.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * timer 操作符类似于 setTimeout() 方法, 但是又有一些区别,
   * 第一个参数 n 如果是一个 number 类型, 则表示 n 毫秒之后产生数据 0, 如果是一个 Date 类型, 则表示在该时刻产生数据 0
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = timer(1);
      expectObservable(source$).toBe("-(a|)", {
        a: 0,
      });
    });
  });

  /*
   * 第二个参数 m 表示, 在第一个数据产生之后, 开始每隔 m 毫秒持续产生递增 1 的数据, 类似于 interval 操作符,
   * 如果第一个和第二个参数一样, 则此时的 timer 跟 interval 功能一样
   */
  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = timer(3, 1);
      expectObservable(source$.pipe(take(3))).toBe("---ab(c|)", {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
