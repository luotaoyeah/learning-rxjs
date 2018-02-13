/*
 * 4.3.4 fromEvent
 */

import { fromEvent, Observable } from "rxjs";

let count = 0;

/*
 * fromEvent() 用来将一个 DOM 事件转化为一个 observable 对象,
 * 第一个参数表示要监听的 DOM 对象, 第二个参数表示要监听的事件名称
 */
const source$: Observable<Event> = fromEvent(
  document.querySelector("#btn-01")!,
  "click",
);

source$.subscribe(() => {
  document.querySelector("#count")!.innerHTML = String(++count);
});
