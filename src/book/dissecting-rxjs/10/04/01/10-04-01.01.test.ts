import { TestScheduler } from "rxjs/testing";
import { ConnectableObservable, interval, Subject } from "rxjs";
import { multicast, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/04/01/10-04-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * multicast() 是一个多播操作符, 用来将上游的 cold observable 转化为 hot observable, 其底层是使用的 subject 来实现,
   * multicast() 返回的是一个 ConnectableObservable, 只有当我们手动调用了 ConnectableObservable.connect() 方法时, 内部的 subject 才会去订阅上游的 cold observable,
   * 这样设计的目的是, 为了更好地控制多播开始的时机
   */
  it("should work", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(
      multicast<number>(new Subject()),
    ) as ConnectableObservable<number>;

    observable$.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable$.subscribe(value => {
        actual02.push(value);
      });
    }, 2000);

    observable$.connect();

    jest.advanceTimersByTime(3000);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });
});
