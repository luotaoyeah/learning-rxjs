import { TestScheduler } from 'rxjs/testing';
import { asyncScheduler, range } from 'rxjs';
import { observeOn } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/11/04/02/11-04-02.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * observeOn() 操作符, 用来根据上游的 observable 创建一个新的下游的 observable 对象,
   * 这个新的 observable对象会使用指定的 scheduler 来控制数据的推送节奏
   *
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = range(1, 3);

      expectObservable(source$.pipe(observeOn(asyncScheduler))).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
