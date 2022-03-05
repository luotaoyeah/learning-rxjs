import { TestScheduler } from 'rxjs/testing';
import { source$ } from './02';

describe('src/book/dissecting-rxjs/02/03/02.ts', () => {
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
      const actual: Array<number> = [];

      const subscription = source$.subscribe({
        next: (value: number) => {
          actual.push(value);
        },
      });

      setTimeout(() => {
        subscription.unsubscribe();
      }, 3500);

      jest.advanceTimersByTime(1000 * 10);

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 3]));
    });
  });
});
