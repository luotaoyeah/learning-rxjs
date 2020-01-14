import { TestScheduler } from 'rxjs/testing';
import { Subject } from 'rxjs';

describe('src/book/dissecting-rxjs/10/03/01/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // subject 既是一个 observable, 也是一个 observer,
  // subject 是 hot observable,
  // subject 在它的内部记录了它所有的 observer
  it('should work', () => {
    scheduler.run(() => {
      const subject = new Subject<number>();

      const actual01: Array<number> = [];
      const actual02: Array<number> = [];

      const subscription01 = subject.subscribe({
        next: (value) => {
          actual01.push(value);
        },
      });

      subject.next(1);

      const subscription02 = subject.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });

      subject.next(2);

      subscription01.unsubscribe();

      subject.next(3);
      subject.complete();

      expect(actual01).toEqual([1, 2]);
      expect(actual02).toEqual([2, 3]);
    });
  });
});
