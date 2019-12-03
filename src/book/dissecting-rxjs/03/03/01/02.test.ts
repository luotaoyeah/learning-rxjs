import { TestScheduler } from 'rxjs/testing';
import { myMap } from './02';
import { interval } from 'rxjs';

describe('src/book/dissecting-rxjs/03/03/01/02.ts', () => {
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
    const actual: Array<number> = [];

    const subscription = interval(1000)
      .pipe(myMap<number, number>((i) => i * i))
      .subscribe({
        next: (value) => {
          actual.push(value);
        },
      });

    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);

    jest.advanceTimersByTime(1000 * 10);

    expect(JSON.stringify(actual)).toEqual(JSON.stringify([0, 1, 4]));
  });
});
