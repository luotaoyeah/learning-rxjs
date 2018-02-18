import { TestScheduler } from "rxjs/testing";
import { from } from "rxjs";
import { reduce } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/01/03/06-01-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * reduce() 操作符类似于 JS 数组中的 reduce() 方法
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const array01 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      expect(
        array01.reduce((acc: number, current: number) => {
          return acc + current;
        }),
      ).toEqual(55);

      expectObservable(
        from(array01).pipe(
          reduce((acc, current) => {
            return acc + current;
          }),
        ),
      ).toBe("(a|)", { a: 55 });
    });
  });
});
