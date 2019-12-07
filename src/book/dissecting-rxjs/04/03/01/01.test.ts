import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/04/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // interval 用来间隔产生数据, 数据从 0 开始, 每次递增为 1
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(3))).toBe('1000ms a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
