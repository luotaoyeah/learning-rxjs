import { interval } from "rxjs";
import { publish, refCount, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/04/02/10-04-02.01.ts", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * publish() 实际上是一个语法糖, 底层使用的还是 multicast() 操作符
   */
  it("should work", () => {
    const source$ = interval(1000).pipe(take(3));

    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    /*
     * publish() 等价于 multicast(new Subject()),
     * publish(selector) 等价于 multicast(() => new Subject(), selector)
     */
    const observable = source$.pipe(
      publish(),
      refCount(),
    );

    observable.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable.subscribe(value => {
        actual02.push(value);
      });
    }, 1500);

    jest.advanceTimersByTime(3000);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });
});
