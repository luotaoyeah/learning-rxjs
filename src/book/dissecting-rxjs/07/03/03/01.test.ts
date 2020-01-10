import { TestScheduler } from 'rxjs/testing';
import { EMPTY, EmptyError, interval } from 'rxjs';
import { map, single, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/03/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // single() 判断上游是否只有一个数据满足条件
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      // 如果没有数据满足条件, 则在上游完结时, 则吐出 undefined
      expectObservable(
        interval(1000).pipe(
          take(3),
          map((i) => i + 1),
          single((value) => value % 5 === 0),
        ),
      ).toBe('3s (a|)', {
        a: undefined,
      });

      // 如果只有一个数据满足条件, 则在上游完结时, 吐出这个数据
      expectObservable(
        interval(1000).pipe(
          take(3),
          map((i) => i + 1),
          single((value) => value % 2 === 0),
        ),
      ).toBe('3s (a|)', { a: 2 });

      // 如果不止一个数据满足条件, 则在上游吐出第二个该数据时, 抛出错误
      expectObservable(
        interval(1000).pipe(
          take(6),
          map((i) => i + 1),
          single((value) => value % 2 === 0),
        ),
      ).toBe('4s #', undefined, 'Sequence contains more than one element');

      // 如果上游没有数据, 则抛出 EmptyError 错误
      expectObservable(EMPTY.pipe(single((value) => value % 5 === 0))).toBe('#', undefined, new EmptyError());
    });
  });
});
