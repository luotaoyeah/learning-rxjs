import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { exhaust, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/02/03/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // switchAll() : 只要有新的 inner observable 产生, 就会去订阅这个新的 inner observable,
  // exhaust()   : 只有在当前 inner observable 完结之后, 才会去订阅新的 inner observable,
  //               在这之间产生的 inner observable 会被丢弃
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(3),
        map((i) =>
          interval(1500).pipe(
            take(2),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(exhaust());

      expectObservable(source$).toBe('2500ms a 1499ms (b|)', {
        a: '0-0',
        b: '0-1',
      });
    });
  });
});
