import { TestScheduler } from 'rxjs/testing';
import { ConnectableObservable, interval, Subject } from 'rxjs';
import { multicast, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/04/01/01.ts', () => {
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

  // multicast() 将上游的 cold observable 转化为 hot observable, 其底层使用的 subject 来实现,
  // multicast() 返回一个 ConnectableObservable, 只有当我们调用了 ConnectableObservable.connect() 方法时, 内部的 subject 才会去订阅上游的 cold observable,
  // 这样设计的目的, 是为了更好地控制多播开始的时机
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));
    const connectableObservable$ = source$.pipe(multicast<number>(new Subject())) as ConnectableObservable<number>;

    const subscription01 = connectableObservable$.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      subscription01.unsubscribe();
    }, 2500);

    setTimeout(() => {
      connectableObservable$.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 1500);

    connectableObservable$.connect();

    jest.advanceTimersByTime(3500);

    expect(actual01).toEqual([0, 1]);
    expect(actual02).toEqual([1, 2]);
  });
});
