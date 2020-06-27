import { TestScheduler } from 'rxjs/testing';
import { concat, interval, timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/01/04.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  //
  // debounce() 使用一个 duration$ 来计时
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        concat(interval(500).pipe(take(3)), interval(1000).pipe(take(2)), interval(1500).pipe(take(2)), interval(1000).pipe(take(2))).pipe(
          debounce((value) => timer(value % 3 === 0 ? 1000 : 500)),
        ),
      ).toBe('1500ms a 499ms b 1499ms c 499ms d 1999ms e 999ms f 1499ms (gh|)', {
        a: 1,
        b: 2,
        c: 0,
        d: 1,
        e: 0,
        f: 1,
        g: 0,
        h: 1,
      });
    });
  });
});
