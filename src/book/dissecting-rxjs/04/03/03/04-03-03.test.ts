import { from } from "rxjs";

/*
 * 不支持在 TestScheduler 中测试 promise: https://github.com/ReactiveX/rxjs/issues/701
 */
describe("src/book/dissecting-rxjs/04/03/03/04-03-03.ts", () => {
  /*
   * from() 可以将一个 promise 对象转化为一个 observable 对象
   */
  it("should work", async () => {
    from(Promise.resolve(9)).subscribe(value => {
      console.log(value);
    });

    from(Promise.reject("FOO")).subscribe(undefined, e => {
      console.log(e);
    });
  });
});
