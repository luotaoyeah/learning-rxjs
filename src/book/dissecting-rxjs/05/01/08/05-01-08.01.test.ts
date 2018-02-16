import { TestScheduler } from "rxjs/testing";
import { startWith, take } from "rxjs/operators";
import { concat, of, timer } from "rxjs";

describe("src/book/dissecting-rxjs/05/01/08/05-01-08.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * startWith() 用来在某个 observable 吐出第一个数据之前, 先同步吐出若干个数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(3));
      const source$ = source01$.pipe(startWith("a", "b"));

      expectObservable(source$).toBe("(abc) 995ms d 999ms (e|)", {
        a: "a",
        b: "b",
        c: 0,
        d: 1,
        e: 2,
      });
    });
  });

  /*
   * 可以使用 concat() 来模拟 startWith(),
   * 区别在于 concat() 是一个静态的操作符, 而 startWith() 是一个实例的操作符
   */
  it("should work with concat()", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(3));
      const source$ = concat(of("a", "b"), source01$);

      expectObservable(source$).toBe("(abc) 995ms d 999ms (e|)", {
        a: "a",
        b: "b",
        c: 0,
        d: 1,
        e: 2,
      });
    });
  });
});
