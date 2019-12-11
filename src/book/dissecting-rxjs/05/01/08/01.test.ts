import { TestScheduler } from 'rxjs/testing';
import { concat, of, timer } from 'rxjs';
import { startWith, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/08/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // startWith() 在订阅上游之前, 先同步吐出若干数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = timer(0, 1000).pipe(take(3));

      expectObservable(source$.pipe(startWith('a', 'b'))).toBe('(abc) 995ms d 999ms (e|)', {
        a: 'a',
        b: 'b',
        c: 0,
        d: 1,
        e: 2,
      });
    });
  });

  /*
   * 使用 concat() 模拟实现 startWith(),
   * 区别在于 concat() 是一个静态操作符, 而 startWith() 是一个实例操作符
   */
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(3));
      const source$ = concat(of('a', 'b'), source01$);

      expectObservable(source$).toBe('(abc) 995ms d 999ms (e|)', {
        a: 'a',
        b: 'b',
        c: 0,
        d: 1,
        e: 2,
      });
    });
  });
});
