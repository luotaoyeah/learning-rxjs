/*
 * Overview
 *     First Example
 *         Values
 */

import { fromEvent } from 'rxjs';
import { map, scan, throttleTime } from 'rxjs/operators';

console.log('\n-------------------------------------------------- 01');
{
  /*
   * 累加每次点击的鼠标横坐标
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#btn01');
  if (buttonEl) {
    let count = 0;
    let lastTime = Date.now();

    buttonEl.addEventListener('click', (event: MouseEvent) => {
      if (Date.now() - lastTime > 1000) {
        count += event.clientX;
        console.log(`%cBTN01 CLICKED ${count}`, 'color:#00ff00');
        lastTime = Date.now();
      }
    });
  }
}

console.log('\n-------------------------------------------------- 02');
{
  /*
   * 在 rxjs 中，当数据（value）流过一系列的 observables 时，可以在这个中间对 value 进行各种处理
   */

  const buttonEl: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#btn02');
  if (buttonEl) {
    fromEvent<MouseEvent>(buttonEl, 'click')
      .pipe(
        throttleTime<MouseEvent>(1000),
        map<MouseEvent, number>((event: MouseEvent) => event.clientX),
        scan<number, number>((count: number, clientX: number) => count + clientX, 0),
      )
      .subscribe((count: number) => {
        console.log(`%cBTN02 CLICKED ${count}`, 'color:#ff0000');
      });
  }
}
