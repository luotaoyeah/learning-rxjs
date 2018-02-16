/*
 * 5.1.6 解决 glitch
 */

/*
 * 使用获取鼠标点击位置的坐标为例, 来展示 combineLatest() 多重依赖导致的问题
 */

import { combineLatest, fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document.querySelector("body")!, "click");
const x$ = click$.pipe(map(i => i.x));
const y$ = click$.pipe(map(i => i.y));

combineLatest([x$, y$])
  .pipe(map(([x, y]) => `[${x}, ${y}]`))
  .subscribe(value => {
    console.log(value);
  });
