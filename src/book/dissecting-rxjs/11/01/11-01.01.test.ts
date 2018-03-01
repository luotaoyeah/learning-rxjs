import { range } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { asap } from "rxjs/internal/scheduler/asap";
import { async } from "rxjs/internal/scheduler/async";
import { animationFrame } from "rxjs/internal/scheduler/animationFrame";
import { queue } from "rxjs/internal/scheduler/queue";

describe("src/book/dissecting-rxjs/11/01/11-01.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // tslint:disable-next-line:no-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * scheduler 的作用是, 用来控制数据推送的节奏
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(range(1, 3)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, asap)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, async)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, queue)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });

      expectObservable(range(1, 3, animationFrame)).toBe("(abc|)", {
        a: 1,
        b: 2,
        c: 3,
      });
    });
  });
});
