import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { audit, take, throttle } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/02/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttle(() => timer(1000), {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1500ms a 999ms b 499ms |', {
        a: 1,
        b: 3,
      });

      expectObservable(source$.pipe(audit(() => timer(1000)))).toBe('1500ms a 999ms b 499ms |', {
        a: 1,
        b: 3,
      });
    });
  });
});
