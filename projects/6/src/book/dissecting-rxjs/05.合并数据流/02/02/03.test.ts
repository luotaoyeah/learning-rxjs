import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, take, zipAll } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/02/02/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // 当 higher-order observable 完结之后, zipAll() 才能确定上游个数, 才会开始订阅所有上游
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map((i) =>
          interval(500).pipe(
            take(2),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(ho$.pipe(zipAll())).toBe('2500ms a 499ms (b|) ', {
        a: ['0-0', '1-0'],
        b: ['0-1', '1-1'],
      });
    });
  });
});
