import { interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/03/04/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // 由于 subject 是一个 hot observable, 所以当 subject complete() 之后, 如果再去订阅它, 就只能收到一个 complete 推送
  it('should work', () => {
    const subject = new Subject<number>();

    const actual01: Array<number> = [];
    const actual02: Array<number | string> = [];

    subject.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    subject.next(1);
    subject.next(2);
    subject.complete();

    subject.subscribe({
      next: (value) => {
        actual02.push(value);
      },
      error: () => {
        actual02.push('ERROR');
      },
      complete: () => {
        actual02.push('COMPLETE');
      },
    });

    // subject complete() 之后再调用 next() 就无效了
    subject.next(3);

    expect(actual01).toEqual([1, 2]);
    expect(actual02).toEqual(['COMPLETE']);
  });

  // 在 subject error() 之后再去订阅它, 则只会收到一个 error 推送
  it('should work 02', () => {
    const subject = new Subject<number>();

    const actual01: Array<number> = [];
    const actual02: Array<number | string> = [];

    subject.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    subject.next(1);
    subject.next(2);
    subject.error(new Error());

    subject.subscribe({
      next: (value) => {
        actual02.push(value);
      },
      error: () => {
        actual02.push('ERROR');
      },
      complete: () => {
        actual02.push('COMPLETE');
      },
    });

    subject.next(3);

    expect(actual01).toEqual([1, 2]);
    expect(actual02).toEqual(['ERROR']);
  });

  // subject 既是一个 observable, 又是一个 observer, 还拥有 unsubscribe() 方法,
  // 当调用了 unsubscribe() 方法之后, 如果再调用 next()/error()/complete() 方法, 就会抛出 ObjectUnsubscribedError 错误
  it('should work 03', () => {
    try {
      const source$ = interval(1000).pipe(take(3));
      const subject = new Subject();
      source$.subscribe(subject);

      setTimeout(() => {
        subject.unsubscribe();
      }, 2000);

      jest.advanceTimersByTime(3000);
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
