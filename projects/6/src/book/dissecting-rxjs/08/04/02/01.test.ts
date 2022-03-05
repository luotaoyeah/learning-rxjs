import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // mergeMap() 等价于 map() + mergeAll()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(4),
        mergeMap((value, i) =>
          interval(500).pipe(
            map((j) => `${i}-${j}`),
            take(3),
          ),
        ),
      );

      expectObservable(source$).toBe('1000ms a 499ms (bd) 496ms (ceg) 495ms (fhj) 495ms (ik) 496ms (l|)', {
        a: '0-0',
        b: '0-1',
        c: '0-2',
        d: '1-0',
        e: '1-1',
        f: '1-2',
        g: '2-0',
        h: '2-1',
        i: '2-2',
        j: '3-0',
        k: '3-1',
        l: '3-2',
      });
    });
  });
});
