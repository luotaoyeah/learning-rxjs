import { TestScheduler } from "rxjs/testing";
import { ConnectableObservable, interval, Subject } from "rxjs";
import { multicast, refCount, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/04/01/10-04-01.03.ts", () => {
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
   * 默认情况下, multicast() 返回的是一个 ConnectableObservable 对象, 我们需要手动调用 ConnectableObservable.connect() 方法来订阅上游的 cold observable,
   * 我们也可以调用 ConnectableObservable.refCount() 方法, 它的作用是:
   *     当 observer 的数量由 0 变为 1 时, 就会自动订阅上游的 cold observable,
   *     当 observer 的数量由 1 变为 0 时, 就会自动退订上游的 cold observable
   * 不再需要手动调用 ConnectableObservable.connect() 方法
   */
  it("should work", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = (source$.pipe(
      multicast<number>(new Subject()),
    ) as ConnectableObservable<number>).refCount();

    observable$.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable$.subscribe(value => {
        actual02.push(value);
      });
    }, 1500);

    jest.advanceTimersByTime(3000);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });

  /*
   * 除了可以调用 ConnectableObservable.refCount() 方法, 也可以使用 refCount() 这个操作符来实现相同的目的
   */
  it("should work 02", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(
      multicast<number>(new Subject()),
      refCount(),
    );

    observable$.subscribe(value => {
      actual01.push(value);
    });

    setTimeout(() => {
      observable$.subscribe(value => {
        actual02.push(value);
      });
    }, 1500);

    jest.advanceTimersByTime(3000);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });
});
