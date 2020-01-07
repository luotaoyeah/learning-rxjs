import { TestScheduler } from 'rxjs/testing';
import { EmptyError, interval, of } from 'rxjs';
import { first, map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // first() 查找第一个满足条件的数据, 这时候的用法跟 find() 类似
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          first((i) => i % 2 === 0),
        ),
      ).toBe('2s (a|)', { a: 2 });
    });
  });

  // 如果没有指定条件, 则直接返回第一个数据
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          first(),
        ),
      ).toBe('1s (a|)', { a: 1 });
    });
  });

  // 如果没有满足条件的数据, 则抛出一个 EmptyError 错误
  it('should throw if not found', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(3),
          first((i) => i === 9),
        ),
      ).toBe('3s #', undefined, new EmptyError());
    });
  });

  // 可以指定一个默认值, 如果没有满足条件的数据, 就会吐出默认值
  it('should emit the default value', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          map((i) => i + 1),
          take(3),
          first((i) => i === 9, 9),
        ),
      ).toBe('3s (a|)', { a: 9 });
    });
  });
});
