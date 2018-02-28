import { interval } from "rxjs";
import {
  publish,
  publishReplay,
  refCount,
  share,
  take,
  tap,
} from "rxjs/operators";
import chalk from "chalk";

describe("src/book/dissecting-rxjs/10/05/02/10-05-02.01.ts", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * 由于 subject 的不可重用性, 如果在 subject 完结之后再添加新的 observer, 则新的 observer 不会收到数据推送
   */
  it("should work with #publish()", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(
      publish(),
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

  /*
   * 可以给 multicast() 传一个工厂方法,
   * 这样, 如果在 subject 完结之后再添加新的 observer, 则会使用工厂方法创建一个新的 subject, 然后重新订阅上游的 cold observable, 新的 observer 就可以收到数据推送
   */
  it("should work with #share()", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(
      take(3),
      tap(value => {
        console.log(chalk.yellow(`${value}`));
      }),
    );

    const observable$ = source$.pipe(share());

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

  /*
   * 给 multicast() 传一个工厂方法, 这种方式的缺点在于, 需要重新订阅上游的 cold observable,
   * 有没有方法既可以接收上游的数据, 又不用重新订阅上游的 cold observable 呢?
   * 这时候就可以使用 publishReplay(), 它在底层传给 multicast() 的是一个 ReplaySubject 对象
   */
  it("should work with #publishReplay()", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(
      take(3),
      tap(value => {
        console.log(chalk.red(`${value}`));
      }),
    );

    const observable$ = source$.pipe(
      publishReplay(),
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

  /*
   * publishReplay() 会对上游的数据进行缓存, 当添加新的 observer 时, 就可以进行重播,
   * 可以通过参数指定需要缓存(重播)多少个上游的数据, 默认是全部数据
   */
  it("should work with #publishReplay().bufferSize", () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(
      take(3),
      tap(value => {
        console.log(chalk.red(`${value}`));
      }),
    );

    const observable$ = source$.pipe(
      publishReplay(2),
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
    expect(actual02).toEqual([1, 2]);
  });
});
