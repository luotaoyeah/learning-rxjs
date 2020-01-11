import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { last, mergeMap, take, windowWhen } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // windowWhen()
  //   1. 开始区块, 调用参数函数获取 notifier$,
  //   2. 当 notifier$ 吐出数据或者完结时, 结束区块, 重复 1.
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(10));

      expectObservable(
        source$.pipe(
          windowWhen(() => timer(500)),
          mergeMap((i) => i.pipe(last(undefined, 99))),
        ),
      ).toBe('500ms x 499ms a 499ms b 499ms c 499ms d 499ms e 499ms f 499ms g 499ms h 499ms  (ij|)', {
        x: 99,
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
      });
      expectObservable(
        source$.pipe(
          windowWhen(() => timer(1000)),
          mergeMap((i) => i.pipe(last(undefined, 99))),
        ),
      ).toBe('1s a 999ms b 999ms c 999ms d 999ms (ef|)', {
        a: 0,
        b: 2,
        c: 4,
        d: 6,
        e: 8,
        f: 9,
      });
    });
  });
});
