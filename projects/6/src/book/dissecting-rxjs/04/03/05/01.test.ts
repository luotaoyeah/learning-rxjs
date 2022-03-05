import { TestScheduler } from 'rxjs/testing';
import { fromEventPattern } from 'rxjs';
import { EventEmitter } from 'events';

describe('src/book/dissecting-rxjs/04/03/05/01.ts', () => {
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

  // fromEvent() 支持的事件有限, 我们可以使用 fromEventPattern() 来支持类似事件的模式,
  // fromEventPattern() 接收两个函数参数, 分别在 subscribe 和 unsubscribe 的时候调用,
  // 这两个函数都接受一个 handler() 函数作为参数,  handler() 函数相当于 next() 方法, 当 handler() 被调用时就会吐出它的参数
  it('should work', () => {
    const eventEmitter = new EventEmitter();

    const actual: Array<number> = [];

    const subscription = fromEventPattern<number>(
      (handler) => {
        eventEmitter.addListener('foo', handler);
      },
      (handler) => {
        eventEmitter.removeListener('foo', handler);
      },
    ).subscribe((value) => {
      actual.push(value);
    });

    eventEmitter.emit('foo', 1);
    eventEmitter.emit('foo', 2);
    eventEmitter.emit('foo__', 3);
    eventEmitter.emit('foo', 4);

    subscription.unsubscribe();

    eventEmitter.emit('foo', 5);

    expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 4]));
  });

  it('should work 02', () => {
    const actual: Array<number> = [];

    const subscription = fromEventPattern<number>(
      (handler) => {
        let i = 1;
        return setInterval(() => {
          // 相当于调用 next(i++) 吐数据
          handler(i++);
        }, 1000);
      },
      (handler, timer) => {
        // addHandler() 的返回值, 会成为 removeHandler() 的第二个参数
        if (timer) {
          clearInterval(timer);
        }
      },
    ).subscribe((value) => {
      actual.push(value);
    });

    setTimeout(() => {
      subscription.unsubscribe();
    }, 3500);

    jest.advanceTimersByTime(4000);

    expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 3]));
  });
});
