import { TestScheduler } from 'rxjs/testing';
import { EMPTY, interval } from 'rxjs';
import { defaultIfEmpty, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/02/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // defaultIfEmpty()
  //   如果上游为空, 则在上游完结时吐出默认值,
  //   如果上游不为空, 则不做操作, 原样吐出上游数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(3), defaultIfEmpty(9))).toBe('1000ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });

      expectObservable(EMPTY.pipe(defaultIfEmpty(9))).toBe('(a|)', { a: 9 });

      // 如果未设置默认值, 则默认值为 null
      expectObservable(EMPTY.pipe(defaultIfEmpty())).toBe('(a|)', { a: null });
    });
  });
});
