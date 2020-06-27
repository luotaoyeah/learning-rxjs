import { TestScheduler } from 'rxjs/testing';
import { debounceTime } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/07.过滤数据流/02.回压控制/01.throttle-debounce/02.test.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // debounceTime():
  //   1. 接收数据, 设为"最新数据", 开始计时,
  //        计时期间有新的数据:
  //          2. 重复步骤 1.
  //        计时期间无新的数据:
  //          2. 停止计时, 数据吐给下游, 重复步骤 1.
  //
  // 如果上游完结时计时还未停止, 则当前的"最新数据"也会吐出.
  it('01', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('500ms a 499ms b 1499ms c 499ms (d|)', { a: 0, b: 1, c: 2, d: 3 });

      expectObservable(source$.pipe(debounceTime(800))).toBe('1800ms a 1199ms (b|)', {
        a: 1,
        b: 3,
      });
    });
  });
});
