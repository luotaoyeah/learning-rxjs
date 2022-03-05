import { interval } from 'rxjs';
import { publish, refCount, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/04/02/10-04-02.01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // publish()         等价于 multicast(new Subject()),
  // publish(selector) 等价于 multicast(() => new Subject(), selector)
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));
    const observable = source$.pipe(publish(), refCount());

    const subscription01 = observable.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      subscription01.unsubscribe();
    }, 2500);

    setTimeout(() => {
      observable.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 1500);

    jest.advanceTimersByTime(3500);

    expect(actual01).toEqual([0, 1]);
    expect(actual02).toEqual([1, 2]);
  });
});
