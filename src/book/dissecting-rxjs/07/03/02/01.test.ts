import { TestScheduler } from 'rxjs/testing';
import { interval, ArgumentOutOfRangeError } from 'rxjs';
import { elementAt, first, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/03/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // elementAt() 表示获取索引位置的数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(take(5));

      expectObservable(source$.pipe(elementAt(3))).toBe('4s (a|)', {
        a: 3,
      });

      // 如果索引超出范围, 并且未指定默认值, 则在上游完结时抛出 ArgumentOutOfRangeError 错误
      expectObservable(source$.pipe(elementAt(5))).toBe('5s #', undefined, new ArgumentOutOfRangeError());

      // 如果索引超出范围, 并且指定了默认值, 则在上游完结时吐出默认值
      expectObservable(source$.pipe(elementAt(5, 9))).toBe('5s (a|)', {
        a: 9,
      });

      // 可以通过 fisrt() 模拟实现 elementAt()
      expectObservable(source$.pipe(first((value, index) => index === 3))).toBe('4s (a|)', {
        a: 3,
      });
    });
  });
});
