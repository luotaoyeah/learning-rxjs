import { TestScheduler } from 'rxjs/testing';
import { interval, Subject } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/03/05/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // subject 可以订阅多个上游, 当任意一个上游 complete/error 时, subject 也就会 complete/error
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000).pipe(take(2), mapTo('A'));
      const source02$ = interval(1500).pipe(take(2), mapTo('B'));

      const subject = new Subject();

      source01$.subscribe(subject);
      source02$.subscribe(subject);

      expectObservable(subject).toBe('1s a 499ms b 499ms (a|)', {
        a: 'A',
        b: 'B',
      });
    });
  });
});
