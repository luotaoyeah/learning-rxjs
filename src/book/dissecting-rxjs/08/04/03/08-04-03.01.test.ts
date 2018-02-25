import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/04/03/08-04-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * switchMap() 等价于 map() + switchAll(),
   * 当有新的 inner observable 出来时, 就会退订当前的 inner observable, 然后订阅这个新的 inner observable,
   * 如果此时旧的 inner observable 刚好有新的数据吐出, 这个数据会被丢弃
   *
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(200).pipe(
        take(2),
        switchMap(i =>
          interval(100).pipe(
            take(3),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(source$).toBe("300ms a 199ms b 99ms c 99ms (d|)", {
        a: "0-0",
        b: "1-0",
        c: "1-1",
        d: "1-2",
      });
    });
  });
});
