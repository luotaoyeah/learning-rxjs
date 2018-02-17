import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { map, switchAll, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/03/05-02-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * switchAll() 用于 high order observable, 作用是: 始终切换到最新吐出的 inner observable,
   * 当 high observable 吐出一个新的 inner observable 时, switch() 就会退订原来订阅的 inner observable, 然后订阅这个新的 inner observable
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const ho$ = interval(1000).pipe(
        take(2),
        map(i =>
          interval(700).pipe(
            take(2),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(switchAll());

      expectObservable(source$).toBe("1700ms a 999ms b 699ms (c|)", {
        a: "0-0",
        b: "1-0",
        c: "1-1",
      });
    });
  });
});
