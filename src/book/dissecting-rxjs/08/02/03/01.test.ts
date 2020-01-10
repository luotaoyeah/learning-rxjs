import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/02/03/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // pluck() 提取上游数据的某个属性的值
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(
        interval(1000)
          .pipe(
            take(3),
            map((i) => ({ k: i, v: `a_${i}` })),
          )
          .pipe(pluck('v')),
      ).toBe('1s a 999ms b 999ms (c|)', {
        a: 'a_0',
        b: 'a_1',
        c: 'a_2',
      });

      // 多个参数表示嵌套属性
      expectObservable(
        interval(1000)
          .pipe(
            take(3),
            map((i) => ({ obj: { k: i, v: `a_${i}` } })),
          )
          .pipe(pluck('obj', 'v')),
      ).toBe('1s a 999ms b 999ms (c|)', {
        a: 'a_0',
        b: 'a_1',
        c: 'a_2',
      });

      // 如果属性不存在, 则吐出 undefined
      expectObservable(
        interval(1000)
          .pipe(
            take(3),
            map((i) => ({ obj: { k: i, v: `a_${i}` } })),
          )
          .pipe(pluck('obj', 'foo', 'v')),
      ).toBe('1s a 999ms b 999ms (c|)', {
        a: undefined,
        b: undefined,
        c: undefined,
      });
    });
  });
});
