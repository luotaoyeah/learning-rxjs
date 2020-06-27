import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/07/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // skipWhile() 跳过上游数据直到条件不满足
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          take(5),
          skipWhile((i) => i < 3),
        ),
      ).toBe('4s a 999ms (b|)', { a: 3, b: 4 });
    });
  });
});
