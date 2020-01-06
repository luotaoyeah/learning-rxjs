import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';
import { map, max, min } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/01/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // max() 返回最大的数据,
  // min() 返回最小的数据,
  // 都要等到上游完结之后, 才会返回
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(
        { name: 'rxjs', year: 2011 },
        { name: 'react', year: 2013 },
        { name: 'redux', year: 2015 },
      ).pipe(min((x, y) => x.year - y.year));

      expectObservable(source$.pipe(map((i) => i.name))).toBe('(a|)', {
        a: 'rxjs',
      });
    });
  });

  // 如果上游吐出的是 number 类型, 可以省略比较函数
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 3, 5).pipe(max())).toBe('(a|)', { a: 5 });
    });
  });
});
