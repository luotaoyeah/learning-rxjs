import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, take, takeLast } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/01/04/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * takeLast() 表示从上游取后 n 个数据,
   * takeLast() 会在上游完结之后, 同步吐出 n 个数据
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          take(5),
          map((i) => i + 1),
          takeLast(2),
        ),
      ).toBe('5s (ab|)', { a: 4, b: 5 });
    });
  });
});
