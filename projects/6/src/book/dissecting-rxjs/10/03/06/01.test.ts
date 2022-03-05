import { TestScheduler } from 'rxjs/testing';
import { interval, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/03/06/01.ts', () => {
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

  // subject 有多个 observer, 只要某个 observer 发生异常, 并且没有处理, 则所有的 observer 都会受到影响
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    try {
      const source$ = interval(1000).pipe(take(10));
      const subject = new Subject<number>();
      source$.subscribe(subject);

      subject
        .pipe(
          map((i) => {
            if (i === 4) {
              throw new Error();
            }

            return i;
          }),
        )
        .subscribe({
          next: (value) => {
            actual01.push(value);
          },
        });

      subject.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });

      jest.advanceTimersByTime(1000 * 10);
    } catch (e) {
      console.log(e);
    } finally {
      expect(actual01).toEqual([0, 1, 2, 3]);
      expect(actual02).toEqual([0, 1, 2, 3, 4]);
    }
  });

  // 解决方法: 每个 observer 都添加错误处理函数
  it('should work 02', () => {
    const actual01: Array<number | string> = [];
    const actual02: Array<number | string> = [];

    const source$ = interval(1000).pipe(take(10));
    const subject = new Subject<number>();
    source$.subscribe(subject);

    subject
      .pipe(
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
      )
      .subscribe({
        next: (value) => {
          actual01.push(value);
        },
        error: () => {
          actual01.push('ERROR');
        },
      });

    subject.subscribe({
      next: (value) => {
        actual02.push(value);
      },
      error: () => {
        actual02.push('ERROR');
      },
    });

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2, 3, 'ERROR']);
    expect(actual02).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
