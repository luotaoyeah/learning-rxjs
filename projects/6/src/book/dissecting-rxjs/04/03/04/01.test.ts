import { TestScheduler } from 'rxjs/testing';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

describe('src/book/dissecting-rxjs/04/03/04/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // fromEvent() 可以将 DOM event 转换为 observable, 也可以将 node event 转换为 observable,
  // 第一个参数为: 事件源,
  // 第二个参数为: 事件名,
  // fromEvent() 创建的是一个 hot observable
  it('should work', () => {
    scheduler.run(() => {
      const eventEmitter = new EventEmitter();

      const actual: Array<number> = [];
      fromEvent<number>(eventEmitter, 'foo').subscribe({
        next: (value) => {
          actual.push(value);
        },
      });

      eventEmitter.emit('foo', 1);
      eventEmitter.emit('foo', 2);
      eventEmitter.emit('foo__', 3);
      eventEmitter.emit('foo', 4);

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2, 4]));
    });
  });
});
