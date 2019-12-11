import { TestScheduler } from 'rxjs/testing';
import { race, timer } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/07/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // race() 选择最先吐出第一个数据的上游作为下游,
  // 一旦某个上游胜出, 其他的上游就会被退订
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(take(3));
      const source02$ = timer(500, 500);

      // source01$ 最先吐出第一个数据, 胜出,
      // 因此 source01$ 成为下游, source02$ 被退订
      expectObservable(race(source01$, source02$)).toBe('a 999ms b 999ms (c|)', {
        a: 0,
        b: 1,
        c: 2,
      });
    });
  });
});
