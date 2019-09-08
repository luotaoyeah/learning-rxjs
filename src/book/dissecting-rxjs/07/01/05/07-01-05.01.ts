/*
 * 7.1.5 计时的点击计数网页程序
 */

/*
 * 统计 5 秒之内的点击次数
 */

import { fromEvent, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const btnEl = document.querySelector('#btn01')!;
const countEl = document.querySelector('#count')!;
const messageEl = document.querySelector('#message')!;

let count: number = 0;
const timer$ = timer(5000);
const click$ = fromEvent(btnEl, 'click').pipe(takeUntil(timer$));

click$.subscribe(() => {
  countEl.innerHTML = (++count).toString();
});

timer$.subscribe(() => {
  messageEl.innerHTML = '时间结束';
});
