import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // take() 表示从上游取前 n 个数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(2),
        ),
      ).toBe('1s a 999ms (b|)', { a: 1, b: 2 });
    });
  });
});
