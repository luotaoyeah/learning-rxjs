import { TestScheduler } from 'rxjs/testing';
import { fromEventPattern } from 'rxjs';
import { EventEmitter } from 'events';

describe('src/book/dissecting-rxjs/04/03/05/04-03-05.01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * fromEventPattern() 用来将类似于 DOM 事件的模式转化为一个 observable 对象,
   * fromEventPattern() 接收两个函数参数, 分别在该 observable 被 subscribe 和 unsubscribe 的时候调用,
   * 这两个参数类似于 DOM 事件中的 addListener() 和 removeListener() 方法, 这两个方法都接受一个 handler 函数作为参数,
   * 这个 handler() 函数类似于 Subscriber.next() 方法, 当这个 handler() 被调用时就相当于调用 next() 方法, 该 observable 就会吐出一个数据
   */
  it('should work', () => {
    const eventEmitter = new EventEmitter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addListener = (handler: (...args: Array<any>) => void) => {
      eventEmitter.addListener('foo', handler);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const removeListener = (handler: (...args: Array<any>) => void) => {
      eventEmitter.removeListener('foo', handler);
    };

    const actual: Array<number> = [];
    fromEventPattern<number>(addListener, removeListener).subscribe((value) => {
      actual.push(value);
    });

    eventEmitter.emit('foo', 1);
    eventEmitter.emit('foo', 2);
    eventEmitter.emit('bar', 3);
    eventEmitter.emit('foo', 4);

    expect(actual).toEqual([1, 2, 4]);
  });
});
