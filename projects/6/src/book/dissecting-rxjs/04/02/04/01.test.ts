import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { generate, range } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * generate<T, S>() 类似于 for 循环, 可以设置:
   *   1. state 的初始值
   *   2. state 满足的条件, 当不满足条件时循环结束
   *   3. state 的变更逻辑
   *   4. 返回值
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(
        generate<number, number>({
          initialState: 1,
          condition: (i) => i < 4,
          iterate: (i) => i + 1,
          resultSelector: (i) => i * i,
        }),
      ).toBe('(abc|)', {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });

  // 使用 `generate()` 模拟实现 `range()`
  it('should simulate #range() with #generate()', () => {
    const myRange = (start: number = 0, count: number) => {
      return generate<number, number>({
        initialState: start,
        condition: (i) => i < start + count,
        iterate: (i) => i + 1,
        resultSelector: (i) => i,
      });
    };

    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(range(2, 3)).toBe('(abc|)', {
        a: 2,
        b: 3,
        c: 4,
      });
      expectObservable(myRange(2, 3)).toBe('(abc|)', {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });
});
