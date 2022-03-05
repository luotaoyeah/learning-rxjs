import { asyncScheduler, Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/11/04/03/11-04-03.01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  /*
   * observeOn() 用来控制数据推送的时机,
   * subscribeOn() 用来控制 observable 被订阅的时机
   *
   * 默认情况下, 调用 Observable.subscribe() 方法进行订阅, 这个过程是同步进行的
   */
  it('should work', () => {
    const actual: Array<string | number> = [];

    const observable$ = new Observable<number>((subscriber) => {
      subscriber.next(0);
      subscriber.complete();
    });

    actual.push('BEFORE');

    observable$.subscribe((value) => {
      actual.push(value);
    });

    actual.push('AFTER');

    expect(actual).toEqual(['BEFORE', 0, 'AFTER']);
  });

  /*
   * 当我们对某个 observable 使用了 subscribeOn() 操作符之后,
   * 接下来对这个 observable 进行订阅时, 就不是同步进行的了, 而是由这个 scheduler 来控制订阅的时机
   */
  it('should work with #subscribeOn()', () => {
    const actual: Array<string | number> = [];

    const observable$ = new Observable<number>((subscriber) => {
      subscriber.next(0);
      subscriber.complete();
    }).pipe(subscribeOn(asyncScheduler));

    actual.push('BEFORE');

    observable$.subscribe((value) => {
      actual.push(value);
    });

    actual.push('AFTER');

    jest.advanceTimersByTime(1000);

    expect(actual).toEqual(['BEFORE', 'AFTER', 0]);
  });
});
