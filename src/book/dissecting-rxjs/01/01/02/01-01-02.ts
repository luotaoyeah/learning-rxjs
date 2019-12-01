import { fromEvent, Timestamp } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { flatMap, map, timestamp, withLatestFrom } from 'rxjs/operators';

const buttonEl: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#hold-me');

if (buttonEl) {
  const mouseDown$ = fromEvent<MouseEvent>(buttonEl, 'mousedown');
  const mouseUp$ = fromEvent<MouseEvent>(buttonEl, 'mouseup');

  const holdTime$ = mouseUp$.pipe(
    timestamp(),
    withLatestFrom(mouseDown$.pipe(timestamp())),
    map<[Timestamp<MouseEvent>, Timestamp<MouseEvent>], number>(
      ([timestampUp, timestampDown]: [Timestamp<MouseEvent>, Timestamp<MouseEvent>]) =>
        timestampUp.timestamp - timestampDown.timestamp,
    ),
  );

  holdTime$.subscribe((ms: number) => {
    document.querySelector('#hold-time')!.innerHTML = String(ms);
  });

  holdTime$
    .pipe(
      flatMap((ms: number) => ajax(`https://timing-sense-score-board.herokuapp.com/score/${ms}`)),
      map((ajaxResponse: AjaxResponse) => ajaxResponse.response),
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .subscribe((res: any) => {
      document.querySelector('#rank')!.innerHTML = `你超过了 ${res.rank}% 的用户`;
    });
}

export {};
