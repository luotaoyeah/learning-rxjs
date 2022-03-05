import { TestScheduler } from 'rxjs/testing';
import { source$ } from './01';
import { tap } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(() => {
      const actual: Array<number> = [];

      // `Observable.subscribe()` 方法返回的是一个 `Subscription` 对象,
      // 调用 `Subscription.unsubscribe()` 方法可以取消订阅,
      // 取消订阅之后, observable 依然可以继续吐出数据, 但是 observer 不会再接收数据
      const subscription = source$
        .pipe(
          tap((i) => {
            console.log('tap:', i);
          }),
        )
        .subscribe({
          next: (i) => {
            console.log('subscribe:', i);
            actual.push(i);
          },
        });

      setTimeout(() => {
        subscription.unsubscribe();
      }, 3500);

      jest.advanceTimersByTime(1000 * 10);

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 3]));
    });
  });
});
