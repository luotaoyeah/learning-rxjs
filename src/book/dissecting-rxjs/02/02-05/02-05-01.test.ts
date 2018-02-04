import { fn01 } from "./02-05-01";

jest.useFakeTimers();

describe("02-05-01", () => {
  it("should work", () => {
    fn01();
    jest.advanceTimersByTime(0);
  });
});
