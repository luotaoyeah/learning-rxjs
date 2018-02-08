import { fn02 } from "./02-04-01";
import { Observable } from "rxjs";

jest.useFakeTimers();

describe("src/book/dissecting-rxjs/02/04/02-04-01.ts", () => {
  /*
   * 使用 Observable 构造函数创建的 observable 都是 cold observable,
   * 因此, 每次订阅都会从头开始推送数据
   */
  it("should work", () => {
    const observable01: Observable<number> = fn02();

    const arr01: Array<number> = [];
    observable01.subscribe((value: number) => {
      arr01.push(value);
    });

    const arr02: Array<number> = [];
    setTimeout(() => {
      observable01.subscribe((value: number) => {
        arr02.push(value);
      });
    }, 2000);

    jest.advanceTimersByTime(5000);
    expect(arr01).toEqual([1, 2, 3, 4, 5]);
    expect(arr02).toEqual([1, 2, 3]);
  });
});
