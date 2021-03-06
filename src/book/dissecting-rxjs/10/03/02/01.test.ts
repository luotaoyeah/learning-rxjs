import { interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/03/02/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // cold observable 无法实现多播
  it('should work', () => {
    const source$ = interval(1000).pipe(take(3));

    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    source$.subscribe({
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
    }, 1500);

    jest.advanceTimersByTime(4500);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
  });

  // 让 subject 去 subscribe 上游的 cold observable, 然后其他的 observer 去 subscribe 这个 subject,
  // 这样就将上游的 cold observable 转换成了一个多播的 hot observable
  it('should work with subject', () => {
    const source$ = interval(1000).pipe(take(3));

    const subject = new Subject<number>();

    // 1. 让 subject 去订阅 source$
    source$.subscribe(subject);

    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    // 2. 让下游的 observer 去订阅 subject
    subject.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      subject.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });

      expect(subject.observers.length).toEqual(2);
    }, 1500);

    jest.advanceTimersByTime(4500);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });
});
