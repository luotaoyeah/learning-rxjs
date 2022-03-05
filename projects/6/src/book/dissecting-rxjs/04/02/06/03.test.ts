import { TestScheduler } from 'rxjs/testing';
import { NEVER } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/06/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // NEVER 表示永不 complete() 的 observable
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(NEVER).toBe('');
    });
  });
});
