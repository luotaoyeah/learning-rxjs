import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { bufferTime, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/01/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // bufferTime() 将时间块中的上游数据放在一个数组中, 在时间块结束的时候, 将这个数组一次性吐给下游,
  // 如果制定了 maxBufferSize, 且在时间块结束之前, 数组元素个数达到了 maxBufferSize, 则此时立刻将数组吐给下游并完结
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(500).pipe(take(10), bufferTime(2000, 1000, 3))).toBe(
        '1500ms a 499ms b 999ms c 999ms d 999ms (ef|)',
        {
          a: [0, 1, 2],
          b: [1, 2, 3],
          c: [3, 4, 5],
          d: [5, 6, 7],
          e: [7, 8, 9],
          f: [9],
        },
      );
    });
  });
});
