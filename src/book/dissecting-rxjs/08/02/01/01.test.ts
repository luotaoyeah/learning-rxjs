import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/02/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // map() 对上游数据进行一一映射
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000).pipe(
          take(3),
          map((i) => i + 1),
          map((i) => i * i),
        ),
      ).toBe('1s a 999ms b 999ms (c|)', {
        a: 1,
        b: 4,
        c: 9,
      });
    });
  });
});
