import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { mergeAll, take, windowCount } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // windowTime()  是根据持续时间来划分区块, 每个区块持续多少时间,
  // windowCount() 是根据数据个数来划分区块, 每个区块包含多少数据,
  //
  // 第一个参数 windowSize 表示每个区块包含多少个数据,
  // 第二个参数 startWindowEvery 表示上一个 window$ 吐出 startWindowEvery 个数据后, 开始下一个 window$
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(500).pipe(take(10), windowCount(4, 2), mergeAll())).toBe(
        '500ms a 499ms b 499ms (cc) 496ms (dd) 496ms (ee) 496ms (ff) 496ms (gg) 496ms (hh) 496ms (ii) 496ms (jj|)',
        {
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          e: 4,
          f: 5,
          g: 6,
          h: 7,
          i: 8,
          j: 9,
        },
      );
    });
  });
});
