import { TestScheduler } from "rxjs/testing";

describe("src/book/dissecting-rxjs/03/03/02/03-03-02.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });
});
