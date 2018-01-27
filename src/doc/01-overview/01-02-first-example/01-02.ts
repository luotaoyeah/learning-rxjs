/*
 * Overview
 *     First Example
 */

import { fromEvent } from "rxjs";

console.log("\n-------------------------------------------------- 01");
{
  /*
   * 使用传统的方式，注册事件监听函数
   */
  const buttonEl = document.querySelector("#btn01");
  if (buttonEl) {
    buttonEl.addEventListener("click", () => {
      console.log("BTN01 CLICKED");
    });
  }
}

console.log("\n-------------------------------------------------- 02");
{
  /*
   * 使用 rxjs 中的 Observable，首先使用 fromEvent() 方法创建一个 Observable 对象，
   * 然后订阅（subscribe）该对象
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<
    HTMLButtonElement
  >("#btn02");

  if (buttonEl) {
    fromEvent(buttonEl, "click").subscribe(() => {
      console.log("%cBTN02 CLICKED", "color:#ff0000");
    });
  }
}
