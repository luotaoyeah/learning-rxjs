import { TestScheduler } from "rxjs/testing";
import { repeatWhen, take } from "rxjs/operators";
import { interval, Observable, of } from "rxjs";

describe("src/book/dissecting-rxjs/04/03/07/04-03-07.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * repeatWhen() 跟 repeat() 有一些类似, 都是用来重复上游数据
   *
   * 我们把 repeatWhen() 的上游数据记为 source$ , 把它的的下游数据记为 repeatWhen$
   *
   * repeatWhen() 接收一个函数参数 notifier(), notifier() 返回一个 observable 记为 notifier$,
   * 当 notifier$ 吐出 complete 时, repeatWhen$ 就会吐出 complete,
   * 当 notifier$ 吐出 error 时, repeatWhen$ 就会吐出 error,
   * 当 notifier$ 吐出 next 时, repeatWhen$ 就会对 source$ 重新订阅
   */
  it("should work", () => {
    /*
     * notifier$ 每隔一秒吐出一个数据, 因此 repeatWhen$ 每隔一秒对 source$ 进行重新订阅
     */
    const source$ = of(1, 2);
    const notifier$ = interval(1000);
    const repeatWhen$ = source$.pipe(
      // tslint:disable-next-line:no-any
      repeatWhen((subscriptions: Observable<any>) => {
        return notifier$;
      }),
    );

    scheduler.run(({ expectObservable }) => {
      expectObservable(repeatWhen$.pipe(take(4))).toBe("(ab) 996ms (cd|)", {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
      });
    });
  });
});
