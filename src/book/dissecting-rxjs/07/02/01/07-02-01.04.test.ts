import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { debounce, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/01/07-02-01.04.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * debounce() 和 debounceTime() 的区别在于: 控制间隔时机的方式不一样,
   * debounceTime() 通过时间间隔来控制, debounceTime() 通过一个另外的 observable 来控制,
   * 当这个 observable 吐出数据时, debounceTime() 就会吐出数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(take(6));

      expectObservable(
        source$.pipe(
          debounce(value => {
            return timer(value % 3 === 0 ? 2000 : 1000);
          }),
        ),
      ).toBe("3000ms a 999ms b 1999ms (cd|)", {
        a: 1,
        b: 2,
        c: 4,
        d: 5,
      });
    });
  });
});
