import { TestScheduler } from "rxjs/testing";
import { source$ } from "./02-02-06";

describe("src/book/dissecting-rxjs/02/02/06/02-02-06.ts", () => {
  let scheduler: TestScheduler;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should work", () => {
    scheduler.run(() => {
      const actual: Array<number> = [];
      source$.subscribe((value: number) => {
        actual.push(value);
      });

      jest.advanceTimersByTime(3000);

      expect(actual).toEqual(jasmine.arrayContaining([1, 2, 3]));
    });
  });
});
