import { TestScheduler } from 'rxjs/testing';
import { fromEvent, merge, Observable } from 'rxjs';
import { EventEmitter } from 'events';

describe('src/book/dissecting-rxjs/05/01/02/03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // merge() 可以用来将同一个对象的多个事件进行合并, 统一处理
  it('should work', () => {
    scheduler.run(() => {
      const eventEmitter = new EventEmitter();

      const source01$ = fromEvent(eventEmitter, 'foo') as Observable<number>;
      const source02$ = fromEvent(eventEmitter, 'bar_') as Observable<string>;

      const actual: Array<number | string> = [];

      merge<[number, string]>(source01$, source02$).subscribe((value) => {
        actual.push(value);
      });

      eventEmitter.emit('foo', 1);
      eventEmitter.emit('bar_', 'a');
      eventEmitter.emit('foo', 2);
      eventEmitter.emit('bar_', 'b');

      expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 'a', 2, 'b']));
    });
  });
});
