import { TestScheduler } from "rxjs/testing";
import { interval } from "rxjs";
import { concatMap, map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/08/04/01/08-04-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * concatMap() 等价于 map() + concatAll(), 其中 map() 返回的是一个高阶的 observable 对象
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(
        take(3),
        concatMap((value, i) =>
          interval(100).pipe(
            take(3),
            map(j => `${i}-${j}`),
          ),
        ),
      );

      expectObservable(source$).toBe(
        "200ms a 99ms b 99ms c 99ms d 99ms e 99ms f 99ms g 99ms h 99ms (i|)",
        {
          a: "0-0",
          b: "0-1",
          c: "0-2",
          d: "1-0",
          e: "1-1",
          f: "1-2",
          g: "2-0",
          h: "2-1",
          i: "2-2",
        },
      );
    });
  });
});
