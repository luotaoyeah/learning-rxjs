import { TestScheduler } from 'rxjs/testing';
import { interval, of } from 'rxjs';
import { every } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/02/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // every() 判断上游数据是否都满足条件, 如果都满足则吐出 true 然后完结,
  // 如果遇到不满足条件的数据, 则吐出 false 然后立刻完结
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(of(1, 2, 3).pipe(every((i) => i > 0))).toBe('(a|)', {
        a: true,
      });
    });
  });

  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(every((i) => i < 3))).toBe('4s (a|)', {
        a: false,
      });
    });
  });
});
