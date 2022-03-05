import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { of } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // of() 将它的每个参数依次吐出
  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(of(...[1, 2, 3])).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
