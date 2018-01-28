/*
 * Overview
 *     First Example
 *         Purity
 */

import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

console.log("\n-------------------------------------------------- 01");
{
  /*
   * 使用传统的方法，记录点击按钮的次数，
   * 需要引入外部变量 count，从而导致事件的回调函数不是一个 pure function
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#btn01");

  if (buttonEl) {
    let count = 0;
    buttonEl.addEventListener("click", () => {
      console.log(`%cBTN01 CLICKED ${++count} TIMES`, "color:#00ff00");
    });
  }
}

console.log("\n-------------------------------------------------- 02");
{
  /*
   * rxjs 的一个优势就是，它里面涉及到的操作都是使用的是 pure function，
   * 如下，使用 rxjs 的方式来实现记录点击按钮的次数
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#btn02");
  if (buttonEl) {
    fromEvent(buttonEl, "click")
      .pipe(scan<MouseEvent, number>((count: number) => count + 1, 0))
      .subscribe((count: number) => {
        console.log(`%cBTN01 CLICKED ${count} TIMES`, "color:#ff0000");
      });
  }
}
