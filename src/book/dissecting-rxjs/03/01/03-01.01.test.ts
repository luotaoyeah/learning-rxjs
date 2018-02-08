import { fn01 } from "./03-01.01";

describe("src/book/dissecting-rxjs/03/01/03-01.01.ts", () => {
  it("should work for filter() & map()", () => {
    const numbers = fn01();
    expect(numbers).toEqual([4, 8]);
  });
});
