import { TestScheduler } from "rxjs/testing";
import { interval, of } from "rxjs";
import { every } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/02/01/06-02-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * every() 操作符用来判断是否上游 observable 吐出的所有数据都满足条件, 如果都满足条件, 则吐出 true, 否则吐出 false,
   * every() 具有短路的特性, 即如果某个数据不满足条件, every() 就会立即完结并吐出 false
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 2, 3).pipe(every(i => i > 0))).toBe("(a|)", {
        a: true,
      });
    });
  });

  it("should work 02", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(every(i => i < 3))).toBe("4s (a|)", {
        a: false,
      });
    });
  });
});
