import { TestScheduler } from "rxjs/testing";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { Observable, of, Subscriber } from "rxjs";
import { repeat, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/04/02/05/04-02-05.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * repeat 操作符用来重复上游的数据流
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = of(1, 2).pipe(repeat(2));
      expectObservable(source$).toBe("(abcd|)", {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
      });
    });
  });

  /*
   * repeat 操作符的参数用来指定要重复的次数,
   * 如果为 0, 表示重复 0 次, 即产生的数据为空,
   * 如果为 [1, n], 表示重复 n 次,
   * 如果为 undefined 或者负数, 表示重复无限次
   */
  it("should repeat x times", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source01$ = of(1, 2).pipe(repeat(0));
      expectObservable(source01$).toBe("|");

      const source02$ = of(1, 2).pipe(repeat());
      expectObservable(source02$.pipe(take(5))).toBe("(abcde|)", {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
        e: 1,
      });
    });
  });

  /*
   * repeat 是如何实现对数据流的重复的?
   * 实际上, repeat 是在不断地对上游数据进行 subscribe 和 unsubscribe 操作, 我们可以添加日志进行观察
   *
   * repeat 在什么时候进行 resubscribe 呢? 在上游数据 complete 的时候,
   * 因此如果上游数据始终没有 complete, 则 repeat 始终不会对数据进行重复, 会一直等待
   */
  it("should resubscribe", () => {
    scheduler.run(({ expectObservable }: RunHelpers) => {
      const source$ = new Observable((subscriber: Subscriber<number>) => {
        console.log("SUBSCRIBE");

        subscriber.next(1);
        subscriber.next(2);
        subscriber.complete();

        return {
          unsubscribe(): void {
            console.log("UNSUBSCRIBE");
          },
        };
      });

      expectObservable(source$.pipe(repeat(2))).toBe("(abcd|)", {
        a: 1,
        b: 2,
        c: 1,
        d: 2,
      });
    });
  });
});
