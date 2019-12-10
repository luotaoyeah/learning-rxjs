import { TestScheduler } from 'rxjs/testing';
import { combineLatest, of, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05/01/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // combineLatest() 用来合并最新数据,
  // 和 zip() 类似, combineLatest() 需要取每个上游的数据来配对,
  // 什么时候往下游吐数据? 当某个上游吐出数据时, 就会取每个上游的最新数据进行配对, 然后吐给下游,
  // 什么时候完结? 当所有的上游都完结之后, 下游才会完结
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(1000, 1000).pipe(
        take(3),
        map((i) => `a_${i}`),
      );
      const source02$ = timer(500, 1000).pipe(
        take(2),
        map((i) => `b__${i}`),
      );
      expectObservable(combineLatest([source01$, source02$])).toBe('1s a 499ms b 499ms c 999ms (d|)', {
        a: ['a_0', 'b__0'],
        b: ['a_0', 'b__1'],
        c: ['a_1', 'b__1'],
        d: ['a_2', 'b__1'],
      });
    });
  });

  // combineLatest() 对于同步数据如何处理?
  // 由于 combineLatest() 是依次对上游进行订阅,
  // 当订阅第二个上游的时候, 第一个上游已经完结了, 此时第一个上游的最新数据永远是最后一个数据
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = of(1, 2, 3);
      const source02$ = of('a', 'b', 'c');

      expectObservable(combineLatest([source01$, source02$])).toBe('(abc|)', {
        a: [3, 'a'],
        b: [3, 'b'],
        c: [3, 'c'],
      });
    });
  });
});
