import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { reduce, scan, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/06/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // scan() 类似 reduce(), 用来对数据进行规约,
  // 区别在于:
  //   reduce() 会对所有的数据进行规约, 最终吐出一个结果数据,
  //   scan()   会在上游每吐出一个数据就进行一次规约, 并把规约结果吐出
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(5));

      expectObservable(source$.pipe(reduce((acc, value) => acc + value, 0))).toBe('2500ms (a|)', { a: 10 });

      expectObservable(source$.pipe(scan((acc, value) => acc + value, 0))).toBe('500ms a 499ms b 499ms c 499ms d 499ms (e|)', {
        a: 0,
        b: 1,
        c: 3,
        d: 6,
        e: 10,
      });
    });
  });
});
