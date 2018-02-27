import { TestScheduler } from "rxjs/testing";
import { interval, Subject } from "rxjs";
import { map, take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/03/06/10-03-06.01.ts", () => {
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
   * subject 可以拥有多个 observer, 只要其中某个 observer 中抛出了错误, 则所有的 observer 都会受到影响
   */
  it("should work", () => {
    const actual01: Array<number | string> = [];
    const actual02: Array<number | string> = [];

    try {
      const source$ = interval(1000).pipe(take(10));

      const subject = new Subject<number>();

      source$.subscribe(subject);

      /*
       * 当 subject 推送数据 4 时, observer01 中抛出了一个错误, 导致 observer02 在接受了数据 4 之后也会停止,
       * 因为 subject 已经被破坏掉了
       */
      subject
        .pipe(
          map(i => {
            if (i === 4) {
              throw new Error("Ⅳ");
            }

            return i;
          }),
        )
        .subscribe(value => {
          actual01.push(value);
        });

      subject.subscribe(value => {
        actual02.push(value);
      });

      jest.advanceTimersByTime(1000 * 10);
    } catch (e) {
      actual01.push("ERROR");
    } finally {
      expect(actual01).toEqual([0, 1, 2, 3, "ERROR"]);
      expect(actual02).toEqual([0, 1, 2, 3, 4]);
    }
  });

  /*
   * 解决方法是, 每个 observer 都添加错误处理函数
   */
  it("should work 02", () => {
    const actual01: Array<number | string> = [];
    const actual02: Array<number | string> = [];

    const source$ = interval(1000).pipe(take(10));

    const subject = new Subject<number>();

    source$.subscribe(subject);

    /*
     * 当 subject 推送数据 4 时, observer01 中抛出了一个错误, 但是它自己给处理掉了, 所以 subject 没有被破坏, 所以不会影响到其他的 observer
     */
    subject
      .pipe(
        map(i => {
          if (i === 4) {
            throw new Error("Ⅳ");
          }

          return i;
        }),
      )
      .subscribe(
        value => {
          actual01.push(value);
        },
        () => {
          actual01.push("ERROR");
        },
      );

    subject.subscribe(
      value => {
        actual02.push(value);
      },
      () => {
        actual02.push("ERROR");
      },
    );

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2, 3, "ERROR"]);
    expect(actual02).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
