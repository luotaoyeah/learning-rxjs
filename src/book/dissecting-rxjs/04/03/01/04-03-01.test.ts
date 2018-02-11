import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/04/03/01/04-03-01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * interval 操作符类似于 setInterval() 方法, 用来间隔产生数据,
   * interval 每个 n 毫秒产生一个数据, 数据从 0 开始, 每次递增 1,
   * 比如: 如果参数为 1000, 则 1 秒之后产生 0, 2 秒之后产生 1, 以此类推
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1).pipe(take(3));
      expectObservable(source$).toBe("-ab(c|)", {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
