import { TestScheduler } from "rxjs/testing";

describe("src/book/dissecting-rxjs/10/04/01/10-04-01.05.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * TODO multicast() 的第二个参数
   */
  it("should work", () => {
    expect(1).toEqual(1);
  });
});
