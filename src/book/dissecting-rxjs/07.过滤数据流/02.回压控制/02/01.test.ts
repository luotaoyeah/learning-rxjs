import { TestScheduler } from 'rxjs/testing';
import { interval } from 'rxjs';
import { auditTime, take, throttleTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07/02/02/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * auditTime() 相当于 throttleTime() 设置了 { leading: false, trailing: true },
   * 但是也有一个区别:
   *   对于 throttleTime(), 如果上游完结时, 计时尚未停止, 则最后一个数据会被吐出
   *   对于 auditTime(),    如果上游完结时, 计时尚未停止, 则最后一个数据不会吐出
   */
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(500).pipe(take(6));

      expectObservable(
        source$.pipe(
          throttleTime(1000, undefined, {
            leading: false,
            trailing: true,
          }),
        ),
      ).toBe('1500ms a 999ms b 499ms (c|)', {
        a: 1,
        b: 3,
        c: 5,
      });

      expectObservable(source$.pipe(auditTime(1000))).toBe('1500ms a 999ms b 499ms |', {
        a: 1,
        b: 3,
      });
    });
  });
});
