import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { map, min } from "rxjs/operators";

describe("src/book/dissecting-rxjs/06/01/02/06-01-02.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = of(
        { name: "rxjs", year: 2011 },
        { name: "react", year: 2013 },
        { name: "redux", year: 2015 },
      ).pipe(min((x, y) => x.year - y.year));

      expectObservable(source$.pipe(map(i => i.name))).toBe("(a|)", {
        a: "rxjs",
      });
    });
  });
});
