import { TestScheduler } from "rxjs/testing";
import { concat, interval, of } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/01/05-01-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * JS 中的数组有一个 concat() 方法, 用来将多个数组的元素依次连接起来组成一个新的数组
   */
  it("should work with Array.concat()", () => {
    expect([1, 2].concat([3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  /*
   * concat() 操作符类似于数组的 concat() 方法, 用来将多个 observable 的数据依次连接起来组成一个新的 observable 对象,
   * 实例的 concat() 操作符已经被废弃了, 推荐使用静态的 concat() 操作符,
   * concat() 的工作原理是, 上一个 observable 在 complete 之后, 就会去订阅下一个 observable 对象
   */
  it("should work with concat()", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(of(1, 2), of(3, 4), interval(1000).pipe(take(2)));
      expectObservable(source$).toBe("(abcd) 994ms e 999ms (f|)", {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 0,
        f: 1,
      });
    });
  });
});
