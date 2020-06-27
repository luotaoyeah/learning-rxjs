import { TestScheduler } from 'rxjs/testing';
import { ajax, AjaxResponse } from 'rxjs/ajax';

describe('src/book/dissecting-rxjs/04/03/06/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // 浏览器自带的 fetch() 请求返回的是一个 promise,
  // rxjs 提供的 ajax()  请求返回的是一个 observable
  it('should work', () => {
    let star = 0;

    ajax({
      url: 'https://api.github.com/repos/ReactiveX/rxjs',
      async: false,
      crossDomain: true,
      // @ts-ignore
      createXHR: () => new XMLHttpRequest(),
    }).subscribe({
      next: (value: AjaxResponse) => {
        star = value.response.stargazers_count;
        expect(star).toBeGreaterThan(20000);
      },
      complete: () => {
        console.log('COMPLETE');
      },
    });
  });
});
