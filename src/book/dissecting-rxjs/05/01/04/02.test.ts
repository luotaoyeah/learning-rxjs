import { TestScheduler } from 'rxjs/testing';
import { combineLatest, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/04/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // combineLatest() 存在一个问题: 所有的上游都可以控制节奏,
  // 也就是说, 任何一个上游吐出数据时, 都会造成往下游吐出数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(
        take(3),
        map((i) => `a_${i}`),
      );
      const source02$ = timer(500, 1000).pipe(
        take(3),
        map((i) => `b__${i}`),
      );

      // 当 source01$ 吐出数据时, 会造成往下游吐出数据,
      // 当 source02$ 吐出数据时, 会造成往下游吐出数据,
      // 它们都有节奏的控制权
      expectObservable(combineLatest([source01$, source02$])).toBe('500ms b 499ms c 499ms d 499ms e 499ms (f|)', {
        b: ['a_0', 'b__0'],
        c: ['a_1', 'b__0'],
        d: ['a_1', 'b__1'],
        e: ['a_2', 'b__1'],
        f: ['a_2', 'b__2'],
      });
    });
  });
});
