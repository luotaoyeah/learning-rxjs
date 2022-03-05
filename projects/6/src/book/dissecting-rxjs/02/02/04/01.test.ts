import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';

describe('src/book/dissecting-rxjs/02/02/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    scheduler.run(() => {
      const source$ = new Observable<number>((observer) => {
        let number = 1;
        const timer = setInterval(() => {
          observer.next(number++);
          if (number > 3) {
            clearInterval(timer);
          }
        }, 1000);
      });

      const actual: Array<number> = [];

      source$.subscribe({
        next: (value: number) => {
          actual.push(value);
        },
      });

      jest.advanceTimersByTime(3000);

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 3]));
    });
  });
});
