import { TestScheduler } from "rxjs/testing";
import { fromEvent, merge } from "rxjs";
import { EventEmitter } from "events";

describe("src/book/dissecting-rxjs/05/01/02/05-01-02.03.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * merge() 可以用来将同一个对象的多个事件进行合并, 统一处理
   */
  it("should work", () => {
    const eventEmitter = new EventEmitter();

    scheduler.run(() => {
      const source01$ = fromEvent(eventEmitter, "foo");
      const source02$ = fromEvent(eventEmitter, "bar");

      const source$ = merge(source01$, source02$);

      const actual: Array<string | number> = [];
      source$.subscribe((value: string | number) => {
        actual.push(value);
      });

      eventEmitter.emit("foo", 1);
      eventEmitter.emit("bar", "a");
      eventEmitter.emit("foo", 2);
      eventEmitter.emit("bar", "b");

      expect(actual).toEqual([1, "a", 2, "b"]);
    });
  });
});
