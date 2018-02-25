import { fromEvent, merge } from "rxjs";
import { concatMap, map, takeUntil } from "rxjs/operators";

/*
 * 使用 concatMap() 实现元素的拖拽移动功能
 */

const divEl = document.querySelector<HTMLDivElement>("#box");

if (divEl) {
  const mousedown$ = fromEvent(divEl, "mousedown");
  const mouseup$ = fromEvent(divEl, "mouseup");
  const mousemove$ = fromEvent(divEl, "mousemove");
  const mouseout$ = fromEvent(divEl, "mouseout");

  mousedown$
    .pipe(
      concatMap((mousedownEvent: MouseEvent) => {
        const offsetLeft = divEl.offsetLeft;
        const offsetTop = divEl.offsetTop;

        return mousemove$.pipe(
          takeUntil(merge(mouseup$, mouseout$)),
          map((mousemoveEvent: MouseEvent) => ({
            x: mousemoveEvent.x - mousedownEvent.x + offsetLeft,
            y: mousemoveEvent.y - mousedownEvent.y + offsetTop,
          })),
        );
      }),
    )
    .subscribe(({ x, y }) => {
      divEl.style.left = `${x}px`;
      divEl.style.top = `${y}px`;
      console.log(divEl.style.left, divEl.style.top);
    });
}
