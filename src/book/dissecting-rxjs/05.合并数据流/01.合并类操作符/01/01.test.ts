import { TestScheduler } from 'rxjs/testing';
import { concat, interval, of } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // concat() 类似于数组的 concat() 方法, 将多个 observable 的数据首尾相连,
  // concat() 的工作原理是: 上一个 observable 在 complete 之后, 就去 subscribe 下一个 observable
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(of(1, 2), of(3, 4), interval(1000).pipe(take(2)));
      expectObservable(source$).toBe('(abcd) 994ms e 999ms (f|)', {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 0,
        f: 1,
      });
    });
  });
});
