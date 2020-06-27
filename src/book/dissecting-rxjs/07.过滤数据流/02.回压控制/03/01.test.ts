import { TestScheduler } from 'rxjs/testing';
import { concat, interval } from 'rxjs';
import { map, sampleTime, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // sampleTime() 将时间轴均匀地分成多个时间块, 在每个时间块的终点, 吐出这个期间的最后一个数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        interval(500).pipe(
          take(2),
          map((i) => i + 1),
        ),
        interval(1000).pipe(
          take(3),
          map((i) => i + 3),
        ),
        interval(500).pipe(
          take(3),
          map((i) => i + 6),
        ),
      );

      expectObservable(source$.pipe(sampleTime(800))).toBe('800ms a 799ms b 799ms c 799ms d 799ms e 799ms f 699ms |', {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
      });
    });
  });
});
