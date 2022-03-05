import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { EMPTY } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/06/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // EMPTY 表示一个立即 complete() 的 observable
  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(EMPTY).toBe('|');
    });
  });
});
