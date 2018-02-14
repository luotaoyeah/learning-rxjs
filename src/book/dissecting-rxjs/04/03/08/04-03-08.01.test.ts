import { TestScheduler } from "rxjs/testing";
import { defer, of } from "rxjs";

describe("src/book/dissecting-rxjs/04/03/08/04-03-08.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * defer() 用来延迟创建 observable 对象,
   * defer() 返回的是一个 observable 对象, 记为 source01$,
   * defer() 接受一个工厂方法, 工厂方法的返回值也是一个 observable 对象, 记为 source02$,
   * 当 source01$ 被**订阅**时, 就会调用工厂方法生成一个新的 source02$, 然后将对 source01$ 的订阅代理到 source02$ 上面去,
   * 实现 observable 对象的延迟创建, 即在被订阅时才会创建一个真正的 observable 对象, 并且每次都是产生一个新的 observable 对象
   */
  it("should work", () => {
    let flag: boolean = true;

    const source01$ = defer(() => {
      console.log("OBSERVABLE FACTORY");
      return flag ? of(1, 2, 3) : of("a", "b", "c");
    });

    scheduler.run(({ expectObservable }) => {
      expectObservable(source01$).toBe("(abc|)", { a: 1, b: 2, c: 3 });
    });

    scheduler.run(({ expectObservable }) => {
      flag = false;
      expectObservable(source01$).toBe("(abc|)", { a: "a", b: "b", c: "c" });
    });
  });
});
