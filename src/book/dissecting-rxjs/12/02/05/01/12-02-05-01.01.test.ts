import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/12/02/05/01/12-02-05-01.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    /*
     * TestScheduler 构造函数参数为比较方法,
     * 可以让我们自定义如何对实际数据和期望数据进行比较,
     * 通常, 我们可以使用测试框架提供的方法, 比如下面的 toEqual() 方法
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;

      const source$: ColdObservable<string> = cold('--a--b--|');
      const expectedMarbles: string = '--a--b--|';

      expectObservable(source$).toBe(expectedMarbles);
    });
  });

  it('should map()', () => {
    scheduler.run((helpers: RunHelpers) => {
      const { cold, expectObservable } = helpers;

      /*
       * 使用 cold()/hot() 方法创建一个 observable 对象时,
       * 可以通过第二个参数, 指定各个数据的实际值
       */
      const source$: ColdObservable<number> = cold('--a--b--|', {
        a: 1,
        b: 2,
      });
      const expectedMarbles: string = '--a--b--|';

      expectObservable(source$.pipe(map((i) => i * 2))).toBe(expectedMarbles, {
        a: 2,
        b: 4,
      });
    });
  });
});
