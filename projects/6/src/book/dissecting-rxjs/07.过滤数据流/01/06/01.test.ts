import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { skip, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/06/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // skip() 表示跳过前 n 个数据, 再取后面的数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(skip(2), take(3))).toBe('3s a 999ms b 999ms (c|)', {
        a: 2,
        b: 3,
        c: 4,
      });
    });
  });

  // 如果跳过的个数超过总个数, 则上游完结时下游就完结
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(3), skip(4))).toBe('3s |');
    });
  });
});
