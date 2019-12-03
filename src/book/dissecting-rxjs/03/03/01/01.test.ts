import { myMap } from './01';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/03/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(of(1, 2, 3).pipe(myMap<number, number>((i) => i * i))).toBe('(abc|)', {
        a: 1,
        b: 4,
        c: 9,
      });

      expectObservable(of(1, 2, 3).pipe(map<number, number>((i) => i * i))).toBe('(abc|)', {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
