import { interval } from 'rxjs';
import { publishLast, refCount, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/05/01/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // publishLast() 会在 cold observable 完结的时候, 将 cold observable 的最后一个数据吐给下游,
  // 如果在这之后, 再添加新的 observer, 这些新的 observer 会立刻收到最后这个数据,
  // publishLast 底层使用 AsyncSubject 实现
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));

    const observable$ = source$.pipe(publishLast(), refCount());
    // // 等价于
    // const observable$ = source$.pipe(multicast(new AsyncSubject()), refCount());

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
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([2]);
    expect(actual02).toEqual([2]);
  });
});
