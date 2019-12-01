import { fn01 } from './03-03-01.01';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

describe('src/book/dissecting-rxjs/03/03/01/03-03-01.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const observable01$ = of(1, 2, 3).pipe<number>(fn01<number, number>()((value: number) => value * value));

      expectObservable(observable01$).toBe('(abc|)', {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
