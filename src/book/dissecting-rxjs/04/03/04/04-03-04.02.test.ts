import { TestScheduler } from "rxjs/testing";
import { fromEvent } from "rxjs";
import { EventEmitter } from "events";

describe("src/book/dissecting-rxjs/04/03/04/04-03-04.02.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * fromEvent() 除了可以转化 DOM 事件之外, 也可以转化 nodejs 中的 EventEmitter
   * fromEvent() 创建的是一个 hot observable
   */
  it("should work with EventEmitter", () => {
    scheduler.run(() => {
      const eventEmitter = new EventEmitter();

      const actual: Array<number> = [];
      fromEvent<number>(eventEmitter, "foo").subscribe(value => {
        actual.push(value);
      });

      eventEmitter.emit("foo", 1);
      eventEmitter.emit("foo", 2);
      eventEmitter.emit("bar", 3);
      eventEmitter.emit("foo", 4);

      expect(actual).toEqual([1, 2, 4]);
    });
  });
});
