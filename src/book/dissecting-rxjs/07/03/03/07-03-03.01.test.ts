import { TestScheduler } from "rxjs/testing";
import { EMPTY, EmptyError, of } from "rxjs";
import { single } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/03/03/07-03-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * single() 判断上游数据中是否只有一个数据满足条件, 如果是, 则返回这个数据, 如果否, 则抛出错误
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 2, 3).pipe(single(value => value % 2 === 0))).toBe(
        "(a|)",
        { a: 2 },
      );

      /*
       * 如果满足条件的数据不止一个, 则抛出错误
       */
      expectObservable(of(1, 2, 3).pipe(single(value => value % 1 === 0))).toBe(
        "#",
        undefined,
        "Sequence contains more than one element",
      );

      /*
       * 如果满足条件的数据不存在, 则返回 undefined
       */
      expectObservable(of(1, 2, 3).pipe(single(value => value % 5 === 0))).toBe(
        "(a|)",
        {
          a: undefined,
        },
      );

      /*
       * 如果上游没有数据, 则抛出 EmptyError 错误
       */
      expectObservable(EMPTY.pipe(single(value => value % 5 === 0))).toBe(
        "#",
        undefined,
        new EmptyError(),
      );
    });
  });
});
