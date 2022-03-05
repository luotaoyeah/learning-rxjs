import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/04/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // switchMap() 等价于 map() + switchAll()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(200).pipe(
        take(2),
        switchMap((i) =>
          interval(150).pipe(
            take(3),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(source$).toBe('350ms a 199ms b 149ms c 149ms (d|)', {
        a: '0-0',
        b: '1-0',
        c: '1-1',
        d: '1-2',
      });
    });
  });
});
