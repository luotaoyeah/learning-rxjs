import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, switchAll, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // switchAll() 表示: 始终切换到最新吐出的 inner observable,
  // 当 higher-order observable 吐出新的 inner observable 时, switchAll() 就会退订原来的 inner observable, 然后订阅这个新的 inner observable
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map((i) =>
          interval(1500).pipe(
            take(2),
            map((j) => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(ho$.pipe(switchAll())).toBe('3500ms a 1499ms (b|)', {
        a: '1-0',
        b: '1-1',
      });
    });
  });
});
