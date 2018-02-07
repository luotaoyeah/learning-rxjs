import { Observable } from "rxjs";
import { fn01 } from "./03-01.02";
import { filter, map } from "rxjs/operators";

describe("03-01", () => {
  it("should work for filter & map", () => {
    const observable01$: Observable<number> = fn01();

    const arr01: Array<number> = [];
    observable01$
      .pipe(
        filter(i => i % 2 === 0),
        map(i => i * 2),
      )
      .subscribe((value: number) => {
        arr01.push(value);
      });

    expect(arr01).toEqual([4, 8]);
  });
});
