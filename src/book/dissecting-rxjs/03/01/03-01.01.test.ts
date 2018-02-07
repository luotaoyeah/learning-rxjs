import { fn01 } from "./03-01.01";

describe("03-01", () => {
  it("should work for filter() & map()", () => {
    const numbers = fn01();
    expect(numbers).toEqual([4, 8]);
  });
});
