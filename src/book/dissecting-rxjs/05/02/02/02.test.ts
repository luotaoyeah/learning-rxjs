import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, mergeAll, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/02/02/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // mergeAll() 类似于 merge(), 它的上游是由一个 HO 吐出来的
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map((i) =>
          interval(1000).pipe(
            take(2),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(ho$.pipe(mergeAll())).toBe('2s a 999ms (bc) 996ms (d|)', {
        a: '0-0',
        b: '0-1',
        c: '1-0',
        d: '1-1',
      });
    });
  });
});
