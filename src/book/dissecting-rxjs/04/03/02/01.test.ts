import { TestScheduler } from 'rxjs/testing';
import { from } from 'rxjs';

describe('src/book/dissecting-rxjs/04/03/02/04-03-02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // from() 将一个 array 转化为一个 observable
  it('should work with array', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(from([1, 2, 3])).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  // from() 将一个 array-like object 转化为一个 observable
  it('should work with array-like object', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        from({
          0: 1,
          1: 2,
          2: 3,
          length: 3,
        }),
      ).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  // from() 将 iterable 对象转化为一个 observable
  it('should work with iterable', () => {
    function* generator01(max: number) {
      for (let i = 1; i <= max; i++) {
        yield i;
      }
    }

    scheduler.run(({ expectObservable }) => {
      expectObservable(from(generator01(3))).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(from([1, 2, 3].values())).toBe('(abc|)', {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });

  // from() 将 string (array of characters) 转化为 observable
  it('should work with string', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(from('123')).toBe('(abc|)', {
        a: '1',
        b: '2',
        c: '3',
      });
    });
  });
});
