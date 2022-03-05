import { interval, MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/03/03/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // 实现一个操作符 makeHot, 将 cold observable 转换为 hot observable,
  // 内部实现使用了 subject
  it('should work', () => {
    const makeHot = <T>(): MonoTypeOperatorFunction<T> => {
      return function (cold$: Observable<T>): Observable<T> {
        const subject = new Subject<T>();
        cold$.subscribe(subject);

        return new Observable<T>((subscriber) => {
          subject.subscribe(subscriber);
        });
      };
    };

    const source$ = interval(500).pipe(take(4), makeHot());

    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const subscription01 = source$.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      source$.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 1250);

    setTimeout(() => {
      subscription01.unsubscribe();
    }, 1750);

    jest.advanceTimersByTime(2500);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([2, 3]);
  });
});
