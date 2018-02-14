import { TestScheduler } from "rxjs/testing";

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
});
