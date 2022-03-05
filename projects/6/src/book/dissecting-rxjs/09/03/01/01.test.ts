import { TestScheduler } from 'rxjs/testing';
import { interval, range, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/09/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // 上游发生异常时, 异常会顺着管道流向下游, 最后触发 Observer.error() 方法
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(6),
        map((i) => {
          if (i === 4) {
            throw new Error('④');
          }

          return i;
        }),
      );

      expectObservable(source$).toBe(
        '500ms a 499ms b 499ms c 499ms d 499ms #',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
        },
        new Error('④'),
      );
    });
  });

  // catchError() 会捕获异常, 并返回一个新的 observable, 然后让下游订阅这个新的 observable
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(6),
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
        catchError(() => {
          return interval(1000).pipe(take(3));
        }),
      );

      expectObservable(source$).toBe('500ms a 499ms b 499ms c 499ms d 1499ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });
    });
  });

  // 第二个参数 caught$ 表示上游发生异常的那个 observable,
  // 如果我们直接返回这个 caught$, 表示对它进行重试
  it('should work 03', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map((i) => {
          if (i === 4) {
            throw new Error();
          }

          return i;
        }),
        catchError((err, caught) => {
          return caught;
        }),
        take(10),
      );

      expectObservable(source$).toBe('(abcabcabca|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  // catchError() 可以抛出一个新的异常
  it('should work 04', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 5).pipe(
        map((i) => {
          if (i === 4) {
            throw new Error('Ⅳ');
          }

          return i;
        }),
        catchError(() => throwError(new Error('④'))),
      );

      expectObservable(source$).toBe(
        '(abc#)',
        {
          a: 1,
          b: 2,
          c: 3,
        },
        new Error('④'),
      );
    });
  });
});
