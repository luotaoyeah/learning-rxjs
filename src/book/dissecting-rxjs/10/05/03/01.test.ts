import { interval } from 'rxjs';
import { publishBehavior, refCount, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/05/03/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // publishBehavior() 会设置一个默认数据, 每当添加新的 observer 时, 这个新的 observer 就会立即收到这个默认数据,
  // 并且, 每当上游吐出数据时, 这个默认数据的值就会更新为这个新的数据
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];
    const actual03: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));
    const observable$ = source$.pipe(publishBehavior(-1), refCount());

    observable$.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      observable$.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 1500);

    setTimeout(() => {
      observable$.subscribe({
        next: (value) => {
          actual03.push(value);
        },
      });
    }, 2500);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([-1, 0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
    expect(actual03).toEqual([1, 2]);
  });
});
