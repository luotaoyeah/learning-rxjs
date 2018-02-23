import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/02/01/08-02-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * map() 对上游的数据进行一一映射
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(1000).pipe(
        take(3),
        map(i => i * i),
      );

      expectObservable(source$).toBe("1s a 999ms b 999ms (c|)", {
        a: 0,
        b: 1,
        c: 4,
      });
    });
  });
});
