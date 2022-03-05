import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // exhaustMap() 等价于 map() + exhaust()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(200).pipe(
        take(2),
        exhaustMap((i) =>
          interval(100).pipe(
            take(3),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(source$).toBe('300ms a 99ms b 99ms (c|)', {
        a: '0-0',
        b: '0-1',
        c: '0-2',
      });
    });
  });
});
