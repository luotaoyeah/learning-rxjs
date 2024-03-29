import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { EMPTY, interval, NEVER, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/12/02/05/02/12-02-05-02.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * - 表示时间的流逝, 一个 - 表示一帧, 即一毫秒
   */
  it('should work with -', () => {
    scheduler.run(() => {
      const time: number = scheduler.createTime('-----|');

      expect(time).toEqual(5);
    });
  });

  it('should work with - 02', () => {
    scheduler.run(() => {
      // @ts-ignore
      TestScheduler.frameTimeFactor = 10;
      const time: number = scheduler.createTime('-----|');
      expect(time).toEqual(50);
      // @ts-ignore
      TestScheduler.frameTimeFactor = 1;
    });
  });

  /*
   * | 表示 Subscriber.complete(),
   * 如果只有一个 |, 则表示 EMPTY,
   * 即该 observable 不推送数据, 直接调用 complete() 结束
   */
  it('should work with |', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(EMPTY).toBe('|');
    });
  });

  /*
   * # 表示 Subscriber.error(),
   * 如果只有一个 #, 则表示 throwError(),
   * 即该 observable 不推送数据, 直接抛出一个错误
   */
  it('should work with #', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(throwError('error')).toBe('#');
    });
  });

  /*
   * 如果 marble string 中既不包含 |, 也不包含 #, 则表示 NEVER,
   * 即该 observable 永不结束
   */
  it('should work with never()', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      expectObservable(NEVER).toBe('-');
    });
  });

  /*
   * 如下, 对 interval() 产生的 observable 进行测试,
   * 因为 interval() 产生的是一个永不结束的数据流,
   * 我们需要使用 take() 来截取前四个数据
   */
  it('should work with interval()', () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const observable01: Observable<number> = interval(1).pipe(take(4));

      /*
       * marble string 中, 除了 | 和 #之外, 其他的字符都是会占用时间帧的,
       * 如下, -abc 每个字符分别都会占用一个帧
       */
      expectObservable(observable01).toBe('-abc(d|)', {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      });
    });
  });

  /*
   * marble string 中的 () 表示它里边的数据(包括 | 和 #)是同时发生的,
   * () 这两个字符也分别会占用一个时间帧
   */
  it('should work with ()', () => {
    scheduler.run(() => {
      const time: number = scheduler.createTime('-(ac)-(bc)-|');

      expect(time).toEqual(11);
    });
  });

  /*
   * marble string 中的 ^ 表示被订阅的时刻, 只对于 hot observable 有效,
   * 因为对于 cold observable 来说, 它被订阅的时刻就是它开始的时刻
   */
  it('should work with ^', () => {
    scheduler.run(({ hot, cold }: RunHelpers) => {
      expect(() => {
        hot('-a-^-b-|');
      }).not.toThrow();

      /*
       * 如果 marble stirng 中包含了 ^, 则用它创建一个 cold observable 时会报错
       */
      expect(() => {
        cold('-a-^-b-|');
      }).toThrow();

      const time: number = scheduler.createTime('-a-^-b-|');
      expect(time).toEqual(7);
    });
  });

  /*
   * marble string 中的空白字符会被忽略,
   * 空白字符可以用来对多个 marble string 进行对齐
   */
  it('should work with whitespace', () => {
    scheduler.run(({ cold, expectObservable }: RunHelpers) => {
      expectObservable(cold('   -a-b-|')).toBe('-a-b-|   ');
    });
  });
});
