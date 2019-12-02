import { TestScheduler } from 'rxjs/testing';
import { source$ } from './01';

describe('src/book/dissecting-rxjs/02/02/06/01.ts', () => {
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

      source$.subscribe({
        next: (value: number) => {
          actual.push(value);
        },
        complete: () => {
          actual.push(0);
        },
      });

      jest.advanceTimersByTime(3000);

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 3, 0]));
    });
  });
});
