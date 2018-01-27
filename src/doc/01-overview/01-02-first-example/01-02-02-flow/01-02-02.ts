/*
 * Overview
 *     First Example
 *         Flow
 */

import { fromEvent } from "rxjs";
import { scan, throttleTime } from "rxjs/operators";

console.log("\n-------------------------------------------------- 01");
{
  /*
   * 限制一秒之内最多只能点击一次
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#btn01");
  if (buttonEl) {
    let count = 0;
    let lastTime = Date.now();

    buttonEl.addEventListener("click", () => {
      if (Date.now() - lastTime > 1000) {
        console.log(`%cBTN01 CLICKED ${++count} TIMES`, "color:#ff0000");
        lastTime = Date.now();
      }
    });
  }
}

console.log("\n-------------------------------------------------- 02");
{
  const buttonEl: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#btn01");
  if (buttonEl) {
    fromEvent(buttonEl, "click")
      .pipe(
        throttleTime(1000),
        scan<MouseEvent, number>((count: number) => count + 1, 0)
      )
      .subscribe((count: number) => {
        console.log(`%cBTN01 CLICKED ${++count} TIMES`, "color:#00ff00");
      });
  }
}
