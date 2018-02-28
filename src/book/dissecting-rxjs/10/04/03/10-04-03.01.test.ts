import { interval } from "rxjs";
import { share, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/04/03/10-04-03.01.ts", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * 跟 publish() 一样, share() 也是一个语法糖, 底层使用的还是 multicast() 操作符,
   * 它的特点在于, 自动调用了 refCount() 方法, 并且传给 multicast() 的是一个工厂方法
   */
  it("should work", () => {
    const source$ = interval(1000).pipe(take(3));

    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const observable = source$.pipe(share());

    observable.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable.subscribe(value => {
        actual02.push(value);
      });
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
  });
});
