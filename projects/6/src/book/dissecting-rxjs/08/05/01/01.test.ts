import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { groupBy, mergeAll, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/05/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // groupBy() 对上游数据进行分组,
  // 第一个函数参数用来计算分组的 key,
  // inner observable 的类型为 GroupedObservable, 它的 key 属性就表示分组的 key
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(6),
        groupBy(
          (i) => i % 2,
          (i) => `${i % 2}-${i}`,
        ),
      );

      expectObservable(source$.pipe(mergeAll())).toBe('100ms a 99ms b 99ms c 99ms d 99ms e 99ms (f|)', {
        a: '0-0',
        b: '1-1',
        c: '0-2',
        d: '1-3',
        e: '0-4',
        f: '1-5',
      });
    });
  });
});
