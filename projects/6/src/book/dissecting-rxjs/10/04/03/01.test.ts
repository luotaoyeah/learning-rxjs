import { interval } from 'rxjs';
import { share, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/04/03/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // share() 等价于 multicast(() => new Subject()).pipe(refCount())
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(take(3));
    const observable = source$.pipe(share());

    observable.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      observable.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
  });
});
