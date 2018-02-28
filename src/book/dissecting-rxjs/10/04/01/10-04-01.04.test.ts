import { TestScheduler } from "rxjs/testing";
import { interval, Subject } from "rxjs";
import { multicast, refCount, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/04/01/10-04-01.04.ts", () => {
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
   * 由于 subject 是不能被重复使用的, 如果我们使用了 refCount(), 则当最后一个 observer 退订之后, 传给 multicast() 的 subject 就会完结,
   * 此时, 如果添加新的 observer, 就不能再收到数据了, 因为 subject 已经完结了, 不能再被使用了,
   * 解决方法是: 给 multicast() 传一个工厂方法, 而不是直接传一个 subject 对象,
   * 这样, 当添加新的 observer 的时候, 如果上次的 subject 已经完结了, 就会使用工厂方法创建一个新的 subject 对象
   */
  it("should work", () => {
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
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([]);
  });

  it("should work 02", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(
      multicast<number>(() => {
        console.log("SUBJECT FACTORY");
        return new Subject<number>();
      }),
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

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
  });
});
