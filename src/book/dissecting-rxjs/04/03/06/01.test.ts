import { TestScheduler } from 'rxjs/testing';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { XMLHttpRequest } from 'xmlhttprequest';

describe('src/book/dissecting-rxjs/04/03/06/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // ajax() 将一个 ajax 请求转化为一个 observable
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
        console.log('NEXT:', star);
      },
      complete: () => {
        console.log('COMPLETE');
      },
    });

    expect(star).toBeGreaterThan(20000);
  });
});
