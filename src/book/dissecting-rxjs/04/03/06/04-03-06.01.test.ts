import { TestScheduler } from "rxjs/testing";
import { JSDOM } from "jsdom";
import { ajax, AjaxResponse } from "rxjs/ajax";

describe("src/book/dissecting-rxjs/04/03/06/04-03-06.01.ts", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  /*
   * ajax() 用来将一个 ajax 请求的返回转化为一个 observable 对象
   * FIXME 下面的代码无法正确运行
   */
  it("should work", () => {
    const { window } = new JSDOM();

    ajax({
      createXHR() {
        // @ts-ignore
        return new window.XMLHttpRequest();
      },
      crossDomain: true,
      responseType: "json",
      url: "https://api.github.com/repos/ReactiveX/rxjs",
    }).subscribe(
      (value: AjaxResponse) => {
        console.log("STAR", value.response.stargazers_count);
      },
      (e: Error) => {
        console.log("ERROR", e);
      },
      () => {
        console.log("COMPLETE");
      },
    );
  });
});
