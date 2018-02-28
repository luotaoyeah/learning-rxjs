import { interval, Subject } from "rxjs";
import { take } from "rxjs/operators";

describe("src/book/dissecting-rxjs/10/03/04/10-03-04.02.ts", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * subject 既是一个 observable, 又是一个 observer,
   * 同时, subject 还拥有一个 Subject.unsubscribe() 方法,
   * 当调用了 Subject.unsubscribe() 方法之后, 如果再调用 Subject.next()/Subject.error()/Subject.complete() 方法, 就会报错
   */
  it("should work", () => {
    let error: Error = new Error();
    try {
      const source$ = interval(1000).pipe(take(3));

      const subject = new Subject();

      source$.subscribe(subject);

      setTimeout(() => {
        subject.unsubscribe();
      }, 2000);

      jest.advanceTimersByTime(3000);
    } catch (e) {
      error = e;
    } finally {
      expect(error.message).toEqual("object unsubscribed");
    }
  });
});
