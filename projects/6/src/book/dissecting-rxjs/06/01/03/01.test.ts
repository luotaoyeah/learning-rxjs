import { TestScheduler } from 'rxjs/testing';
import { from, Observable, of, OperatorFunction } from 'rxjs';
import { max, reduce } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/06/01/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // reduce() 类似于 Array.prototype.reduce() 方法
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const array01 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      expect(
        array01.reduce((accumulation, current) => {
          return accumulation + current;
        }, 0),
      ).toEqual(55);

      expectObservable(
        from(array01).pipe(
          reduce((accumulation, current) => {
            return accumulation + current;
          }),
        ),
      ).toBe('(a|)', { a: 55 });
    });
  });

  // 使用 reduce() 模式实现 max()
  it('should work 02', () => {
    scheduler.run(({ expectObservable }) => {
      const myMax = <T = number>(comparer?: (x: T, y: T) => number): OperatorFunction<T, T> => {
        return function (upstream$: Observable<T>) {
          return upstream$.pipe(
            reduce((accu: T, current: T) => {
              return typeof comparer === 'function' ? (comparer(accu, current) > 0 ? accu : current) : accu > current ? accu : current;
            }),
          );
        };
      };

      const source$ = of(1, 3, 5);
      expectObservable(source$.pipe(max())).toBe('(a|)', { a: 5 });
      expectObservable(source$.pipe(myMax())).toBe('(a|)', { a: 5 });
    });
  });
});
