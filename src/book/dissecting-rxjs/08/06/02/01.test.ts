import { TestScheduler } from 'rxjs/testing';
import { interval, of } from 'rxjs';
import { mergeScan, scan, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/06/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // mergeScan() 和 scan() 的区别在于, 每次规约之后返回的是一个 observable 对象,
  // 等价于 scan() + mergeAll()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(take(5));

      expectObservable(source$.pipe(scan((acc, value) => acc + value))).toBe('100ms a 99ms b 99ms c 99ms d 99ms (e|)', {
        a: 0,
        b: 1,
        c: 3,
        d: 6,
        e: 10,
      });

      expectObservable(source$.pipe(mergeScan((acc, value) => of(acc + value), 0))).toBe('100ms a 99ms b 99ms c 99ms d 99ms (e|)', {
        a: 0,
        b: 1,
        c: 3,
        d: 6,
        e: 10,
      });
    });
  });
});
