import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { range } from 'rxjs';

describe('src/book/dissecting-rxjs/04/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // range(start, count) 创建递增 1 的数字序列,
  //   start 表示从哪个数字开始,
  //   count 表示总共的数字个数
  it('should work', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(range(2, 3)).toBe('(abc|)', {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });

  // 支持小数
  it('should work with floating-point number', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(range(1.5, 3)).toBe('(abc|)', {
        a: 1.5,
        b: 2.5,
        c: 3.5,
      });
    });
  });
});
