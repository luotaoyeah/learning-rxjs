import { TestScheduler } from "rxjs/testing";
import { interval, of, zip } from "rxjs";

describe("src/book/dissecting-rxjs/05/01/03/05-01-03.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * zip() 操作符表示拉链合并, 它会对上游的 observable 吐出的数据一一进行结对, 然后将每一对转化为一个数组, 然后将这个数组吐出给最终的 observable,
   * 由于数据是一一结对的, 但是不同的 observable 吐出数据的节奏是不一样的, 先吐出的数据需要等待后吐出的数据, 最后一起合并,
   * 当某个上游的 observable 完结了之后, 则当它的最后一个数据成功结对合并之后, 最终的 observable 就会完结
   */
  it("should work", () => {
    scheduler.run(({ expectObservable }) => {
      const source01$ = interval(1000);
      const source02$ = of("a", "b", "c");

      const source$ = zip(source01$, source02$);

      expectObservable(source$).toBe("1s a 999ms b 999ms (c|)", {
        a: [0, "a"],
        b: [1, "b"],
        c: [2, "c"],
      });
    });
  });
});
