import { fn02 } from "./02-04-01";

jest.useFakeTimers();

describe("02-04-01", () => {
  it("should work", () => {
    fn02();
    jest.advanceTimersByTime(10000);
  });
});
