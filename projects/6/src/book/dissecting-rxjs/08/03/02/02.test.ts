import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { bufferCount, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/02/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(500).pipe(take(10), bufferCount(4, 2))).toBe('2s a 999ms b 999ms c 999ms (de|)', {
        a: [0, 1, 2, 3],
        b: [2, 3, 4, 5],
        c: [4, 5, 6, 7],
        d: [6, 7, 8, 9],
        e: [8, 9],
      });
    });
  });
});
