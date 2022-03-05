import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { bufferToggle, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/04/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(10),
        bufferToggle(timer(0, 2000), (value) => {
          if (value % 2 === 0) {
            return timer(1000);
          } else {
            return timer(1500);
          }
        }),
      );

      expectObservable(source$).toBe('1s a 2499ms b 1499ms (c|)', {
        a: [0],
        b: [3, 4, 5],
        c: [7, 8],
      });
    });
  });
});
