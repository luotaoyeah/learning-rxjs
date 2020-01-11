import { TestScheduler } from 'rxjs/testing';
import { interval, timer } from 'rxjs';
import { concatAll, exhaust, take, windowToggle } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/03/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // windowWhen()
  //   1. 开始区块, 调用 closingSelector() 获取 notifier$,
  //   2. 当 notifier$ 吐出数据或者完结时, 结束区块, 重复 1.
  //
  // windowToggle()
  //   1. opening$ 吐出数据,
  //   2. 开始区块, 调用 closingSelector() 获取 notifier$, 并将 opening$ 吐出的数据传给 closingSelector(),
  //   3. 当 notifier$ 吐出数据或者完结时, 结束区块, 重复 1.
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(
        take(10),
        windowToggle(timer(0, 2000), (value) => {
          if (value % 2 === 0) {
            return timer(1000);
          } else {
            return timer(1500);
          }
        }),
      );

      expectObservable(source$.pipe(concatAll())).toBe('500ms a 1499ms b 499ms c 499ms d 999ms e 499ms f 499ms |', {
        a: 0,
        b: 3,
        c: 4,
        d: 5,
        e: 7,
        f: 8,
      });
    });
  });
});
