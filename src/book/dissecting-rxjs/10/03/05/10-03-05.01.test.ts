import { TestScheduler } from "rxjs/testing";
import { interval, Subject } from "rxjs";
import { mapTo, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/03/05/10-03-05.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * 当 subject 作为一个 observer 时, 它可以订阅多个上游的 observable 对象,
   * 需要注意的是, 只要有任意一个上游的 observable 完结时, subject 也就会完结
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(
        take(2),
        mapTo("A"),
      );

      const source02$ = interval(1000).pipe(
        take(2),
        mapTo("B"),
      );

      const subject = new Subject();

      source01$.subscribe(subject);
      source02$.subscribe(subject);

      expectObservable(subject).toBe("1s (ab) 996ms (a|)", {
        a: "A",
        b: "B",
      });
    });
  });
});
