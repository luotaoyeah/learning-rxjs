import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { last, mergeMap, take, window } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/05/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // window() 接收一个 notifier$, 每当 notifier$ 吐出数据或者完结时, 就会结束上一个区块并立即开始下一个区块
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(10));

      expectObservable(
        source$.pipe(
          window(interval(1000)),
          mergeMap((i) => i.pipe(last())),
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
