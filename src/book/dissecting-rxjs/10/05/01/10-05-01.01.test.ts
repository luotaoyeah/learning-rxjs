/*
 * Subject 有很多的子类, 比如 AsyncSubject/ReplaySubject/BehaviorSubject,
 * 如果传给 multicast() 的是这几个子类的实例对象, 就产生了几个新的操作符: publishLast/publishReplay/publishBehavior
 */
import { interval } from "rxjs";
import { publishLast, refCount, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/05/01/10-05-01.01.ts", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * publishLast() 表示, 会在 cold observable 完结的时候, 将 cold observable 的最后一个数据吐给下游,
   * 如果在这之后再添加新的 observer, 则这些 observer 会直接收到这个最后一个数据
   */
  it("should work", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(
      publishLast(),
      refCount(),
    );

    observable$.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable$.subscribe(value => {
        actual02.push(value);
      });
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([2]);
    expect(actual02).toEqual([2]);
  });
});
