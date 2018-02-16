/*
 * 5.1.6 解决 glitch
 */

/*
 * 使用获取鼠标点击位置的坐标为例, 使用 withLatestFrom() 来解决 combineLatest() 多重依赖导致的问题
 */

import { fromEvent } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document.querySelector("body")!, "click");
const x$ = click$.pipe(map(i => i.x));
const y$ = click$.pipe(map(i => i.y));

x$.pipe(
  withLatestFrom(y$),
  map(([x, y]) => `[${x}, ${y}]`),
).subscribe(value => {
  console.log(value);
});
