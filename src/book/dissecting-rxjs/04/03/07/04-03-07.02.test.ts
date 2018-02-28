/* tslint:disable:no-any */
import { TestScheduler } from "rxjs/testing";
import { repeatWhen, take } from "rxjs/operators";
import { interval } from "rxjs";

describe("src/book/dissecting-rxjs/04/03/07/04-03-07.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * repeatWhen() 的上游数据可以是异步数据, 记为 source$, repeatWhen() 的参数函数返回的 observable 对象记为 notifier$,
   * 每当 notifier$ 吐出一个数据, 就会去订阅一次 source$, 从而产生一个 source execution,
   * 当某个 source$ 完结时, 此时正在执行的其他的 source execution 都会完结,
   * 当 notifier$ 完结时, 整个数据流就会完结
   */
  it("should work", () => {
    const source$ = interval(2000).pipe(take(2));

    source$.subscribe = new Proxy(source$.subscribe, {
      apply(target: any, thisArg: any, argArray?: any): any {
        console.log("SUBSCRIBE");
        return target.apply(thisArg, argArray);
      },
    });

    scheduler.run(({ expectObservable }) => {
      expectObservable(source$).toBe("2s a 1999ms (b|)", { a: 0, b: 1 });

      expectObservable(
        source$.pipe(
          repeatWhen(() => interval(1000)),
          take(8),
        ),
      ).toBe(
        "2000ms a 1999ms b 2999ms a 999ms a 999ms b 1999ms a 999ms a 999ms (b|)",
        {
          a: 0,
          b: 1,
        },
      );
    });
  });
});
