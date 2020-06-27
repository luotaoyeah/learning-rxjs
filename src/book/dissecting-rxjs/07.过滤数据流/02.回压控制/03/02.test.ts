import { TestScheduler } from 'rxjs/testing';
import { concat, interval } from 'rxjs';
import { sample, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/03/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // sample() 接受一个 notifier$,
  // 每当 notifier$ 吐出一个数据, sample() 就吐出一个数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(500).pipe(take(8), sample(concat(interval(500).pipe(take(2)), interval(1000).pipe(take(3)), interval(500).pipe(take(3))))),
      ).toBe('500ms a 499ms b 999ms c 999ms d 999ms (e|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 4,
        e: 6,
      });
    });
  });
});
