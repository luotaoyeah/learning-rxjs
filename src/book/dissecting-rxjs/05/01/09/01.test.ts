import { TestScheduler } from 'rxjs/testing';
import { forkJoin, interval, of, timer } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/09/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // forkJoin() 类似于 Promise.all(),
  // 在所有上游都完结之后, 合并吐出所有上游的最后一个数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(take(3));
      const source02$ = timer(500, 1000).pipe(take(9));
      const source03$ = of(1, 2, 3);

      expectObservable(forkJoin([source01$, source02$, source03$])).toBe('8500ms (a|)', {
        a: [2, 8, 3],
      });
    });
  });
});
