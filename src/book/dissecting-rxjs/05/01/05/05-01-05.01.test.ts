import { TestScheduler } from "rxjs/testing";
import { interval, timer } from "rxjs";
import { map, take, withLatestFrom } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/01/05/05-01-05.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * withLatestFrom() 和 combileLatest() 类似,
   * 区别在于:
   *   对于 combileLatest(), 任何一个上游的 observable 吐出数据时, 都会导致最终的 observable 吐出数据,
   *   对于 withLatestFrom(), 只有某一个上游的 observable 吐出数据时, 才会导致最终的 observable 吐出数据,
   *     其余的上游 observable 不会影响数据的吐出节奏
   *
   * 如下, source$ 吐出数据的节奏是由 source01$ 控制的
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = timer(0, 1000).pipe(map(i => i * 10));
      const source02$ = interval(500);

      const source$ = source01$.pipe(
        withLatestFrom(source02$),
        take(5),
        map(([x, y]) => x + y),
      );

      expectObservable(source$).toBe(
        "1s a 999ms b 999ms c 999ms d 999ms (e|)",
        {
          a: 10,
          b: 22,
          c: 34,
          d: 46,
          e: 58,
        },
      );
    });
  });
});
