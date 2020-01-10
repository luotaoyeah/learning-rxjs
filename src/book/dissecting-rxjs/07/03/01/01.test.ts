import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { ignoreElements, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // ignoreElements() 表示忽略所有的数据, 只关心 complete() 和 error()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(5)).pipe(ignoreElements())).toBe('5s |');
    });
  });
});
