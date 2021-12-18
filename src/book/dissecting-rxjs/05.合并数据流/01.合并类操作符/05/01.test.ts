import { TestScheduler } from 'rxjs/testing';
import { combineLatest, timer } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/05/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // withLatestFrom() 和 combileLatest() 区别:
  //   对于 combileLatest(),  任何一个上游吐出数据时, 都会造成往下游吐出数据,
  //   对于 withLatestFrom(), 只有一个上游吐出数据时, 才会造成往下游吐出数据,
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

      // source01$ 和 source02$ 都可以控制节奏
      expectObservable(combineLatest([source01$, source02$])).toBe('500ms b 499ms c 499ms d 499ms e 499ms (f|)', {
        b: ['a_0', 'b__0'],
        c: ['a_1', 'b__0'],
        d: ['a_1', 'b__1'],
        e: ['a_2', 'b__1'],
        f: ['a_2', 'b__2'],
      });

      // 只有 source01$ 可以控制节奏
      expectObservable(source01$.pipe(withLatestFrom(source02$))).toBe('1000ms b 999ms (c|)', {
        b: ['a_1', 'b__0'],
        c: ['a_2', 'b__1'],
      });
    });
  });
});
