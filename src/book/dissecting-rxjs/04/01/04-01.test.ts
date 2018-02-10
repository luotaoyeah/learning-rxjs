import { TestScheduler } from "rxjs/testing";
import { from, of } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";

describe("src/book/dissecting-rxjs/04/01/04-01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * from 是一个创建类操作符
   */
  it("should work with #from()", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(from([1, 2, 3])).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  /*
   * of 是一个创建类操作符
   */
  it("should work with #of()", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(of(1, 2, 3)).toBe("(abc|)", { a: 1, b: 2, c: 3 });
    });
  });
});
