import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/02/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // mapTo() 把每个上游数据都映射为固定的值, 相当于一个简单版本的 map()
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(interval(1000).pipe(take(3), mapTo('A'))).toBe('1s a 999ms b 999ms (c|)', {
        a: 'A',
        b: 'A',
        c: 'A',
      });
    });
  });
});
