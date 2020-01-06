import { TestScheduler } from 'rxjs/testing';
import { EMPTY, interval, timer } from 'rxjs';
import { concatAll, isEmpty, map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // isEmpty() 判断上游是否没有吐出数据就直接完结
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(isEmpty())).toBe('1s (a|)', {
        a: false,
      });

      expectObservable(EMPTY.pipe(isEmpty())).toBe('(a|)', { a: true });

      expectObservable(
        timer(2000).pipe(
          map(() => EMPTY),
          concatAll(),
          isEmpty(),
        ),
      ).toBe('2s (a|)', { a: true });
    });
  });
});
