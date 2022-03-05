import { TestScheduler } from 'rxjs/testing';
import { interval, of, timer, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/05.合并数据流/01.合并类操作符/03.zip/01.test.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // zip() 表示拉链合并, 它会对上游的数据一一结对成为一个数组, 然后将数组吐给下游,
  // 由于不同的上游吐出数据的节奏不一样, 先吐出的数据需要等待后吐出的数据,
  it('01', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000);
      const source02$ = of('a', 'b', 'c');

      const source$ = zip(source01$, source02$);

      expectObservable(source$).toBe('1s a 999ms b 999ms (c|)', {
        a: [0, 'a'],
        b: [1, 'b'],
        c: [2, 'c'],
      });
    });
  });

  // 下游的数据个数, 是由 '数据个数最少的上游' 决定的, 记为 N,
  // 下游的完结时机, 是由 '最后吐出 N 个数据的上游' 决定的,
  it('02', () => {
    scheduler.run(({ expectObservable }) => {
      // 数据个数最少, 因此决定了下游的数据个数为 2,
      // 吐出 2 个数据最慢, 因此决定了下游的完结时机
      const source01$ = interval(1000).pipe(take(2));
      const source02$ = of('a', 'b', 'c');
      const source03$ = timer(500, 1000).pipe(map((i) => `c___${i}`));

      const source$ = zip(source01$, source02$, source03$);

      expectObservable(source$).toBe('1s a 999ms (b|)', {
        a: [0, 'a', 'c___0'],
        b: [1, 'b', 'c___1'],
      });
    });
  });
});
