import { fn01 } from "./02-05-01";

jest.useFakeTimers();

describe("src/book/dissecting-rxjs/02/02-05/02-05-01.ts", () => {
  it("should work", () => {
    fn01();
    jest.advanceTimersByTime(0);
  });
});
