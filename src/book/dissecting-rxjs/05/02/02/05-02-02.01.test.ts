import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { concatAll, map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/05/02/02/05-02-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * concatAll() 类似于 concat(), 只不过它的上游 observable 是一个高阶的 observable 吐出的所有的 observable 数据
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      /*
       * 如下的 ho$ 是一个高阶的 observable 对象
       */
      const ho$ = interval(1000).pipe(
        take(2),
        map(i =>
          interval(1500).pipe(
            take(2),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      const source$ = ho$.pipe(concatAll());

      expectObservable(source$).toBe("2.5s a 1499ms b 1499ms c 1499ms (d|)", {
        a: "0-0",
        b: "0-1",
        c: "1-0",
        d: "1-1",
      });
    });
  });
});
