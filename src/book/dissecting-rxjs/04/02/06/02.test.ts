import { TestScheduler } from 'rxjs/testing';
import { throwError } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/06/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // throwError 返回一个立即 error() 的 observable
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(throwError(new Error('ERR'))).toBe('#', undefined, new Error('ERR'));
    });
  });
});
