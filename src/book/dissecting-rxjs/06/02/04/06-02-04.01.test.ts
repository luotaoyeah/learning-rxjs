import { TestScheduler } from "rxjs/testing";
import { EMPTY, of } from "rxjs";
import { defaultIfEmpty } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/02/04/06-02-04.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * defaultIfEmpty() 表示如果上游 observable 没有吐出数据就直接完结, 那么它就会吐出这个默认值,
   * 如果没有设置默认值, 则默认值为 null
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(0).pipe(defaultIfEmpty(9))).toBe("(a|)", { a: 0 });
      expectObservable(EMPTY.pipe(defaultIfEmpty(9))).toBe("(a|)", { a: 9 });
      expectObservable(EMPTY.pipe(defaultIfEmpty())).toBe("(a|)", { a: null });
    });
  });
});
