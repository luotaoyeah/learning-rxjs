import { Subject } from "rxjs";

describe("src/book/dissecting-rxjs/10/03/04/10-03-04.01.ts", () => {
  /*
   * 由于 subject 是一个 hot observable, 所以当 subject 完结之后, 如果再去订阅它, 就只能收到一个 complete 推送
   */
  it("should work", () => {
    const subject = new Subject<number>();

    const actual01: Array<number> = [];
    const actual02: Array<number | string> = [];

    subject.subscribe(value => {
      actual01.push(value);
    });

    subject.next(1);
    subject.next(2);
    subject.complete();

    subject.subscribe(
      value => {
        actual02.push(value);
      },
      () => {
        actual02.push("ERROR");
      },
      () => {
        actual02.push("COMPLETE");
      },
    );

    expect(actual01).toEqual([1, 2]);
    expect(actual02).toEqual(["COMPLETE"]);
  });

  /*
   * 如果在 subject 抛出错误之后再去订阅它, 则只会收到一个 error 推送
   */
  it("should work 02", () => {
    const subject = new Subject<number>();

    const actual01: Array<number> = [];
    const actual02: Array<number | string> = [];

    subject.subscribe(value => {
      actual01.push(value);
    });

    subject.next(1);
    subject.next(2);
    subject.error("");

    subject.subscribe(
      value => {
        actual02.push(value);
      },
      () => {
        actual02.push("ERROR");
      },
      () => {
        actual02.push("COMPLETE");
      },
    );

    expect(actual01).toEqual([1, 2]);
    expect(actual02).toEqual(["ERROR"]);
  });
});
