import { TestScheduler } from "rxjs/testing";
import { asyncScheduler, range, scheduled } from "rxjs";
import { mergeAll } from "rxjs/operators";

describe("src/book/dissecting-rxjs/11/04/01/11-04-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 有一些创建类和合并类的操作符是支持配置 scheduler 的
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = range(1, 3);
      const source02$ = range(11, 3);

      expectObservable(
        scheduled([source01$, source02$], asyncScheduler).pipe(mergeAll()),
      ).toBe("(abcdef|)", { a: 1, b: 2, c: 3, d: 11, e: 12, f: 13 });
    });
  });
});
