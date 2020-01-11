import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { bufferWhen, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/03/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(500).pipe(
          take(10),
          bufferWhen(() => timer(1000)),
        ),
      ).toBe('1s a 999ms b 999ms c 999ms d 999ms (ef|)', {
        a: [0],
        b: [1, 2],
        c: [3, 4],
        d: [5, 6],
        e: [7, 8],
        f: [9],
      });
    });
  });
});
