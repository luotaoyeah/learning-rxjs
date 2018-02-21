import { TestScheduler } from "rxjs/testing";
import { concat, interval } from "rxjs";
import { map, sample, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/07/02/03/07-02-03.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * sample() 接受一个 observable 参数, 记为 notifier$,
   * 每当 notifier$ 吐出一个数据, sample() 就吐出一个最新的数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = concat(
        interval(500).pipe(
          take(2),
          map(i => `${i}A`),
        ),
        interval(1000).pipe(
          take(3),
          map(i => `${i}B`),
        ),
        interval(500).pipe(
          take(3),
          map(i => `${i}C`),
        ),
      );

      expectObservable(source$.pipe(sample(interval(800)))).toBe(
        "800ms a 799ms b 799ms c 799ms d 799ms e 799ms f 699ms |",
        {
          a: "0A",
          b: "1A",
          c: "0B",
          d: "1B",
          e: "2B",
          f: "0C",
        },
      );
    });
  });
});
