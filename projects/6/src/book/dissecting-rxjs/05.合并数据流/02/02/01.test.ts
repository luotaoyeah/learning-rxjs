import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { concatAll, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/02/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // concat()    用来合并多个上游,
  // concatAll() 用来合并多个上游, 只是它的上游是由一个 HO 吐出来的
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

      expectObservable(ho$.pipe(concatAll())).toBe('2s a 999ms b 999ms c 999ms (d|)', {
        a: '0-0',
        b: '0-1',
        c: '1-0',
        d: '1-1',
      });
    });
  });
});
