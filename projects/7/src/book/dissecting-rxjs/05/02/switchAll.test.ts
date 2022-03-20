import { interval, map, switchAll, take, zipAll } from 'rxjs';
import { log } from '../../util';

describe('switchAll', () => {
    /**
     * 始终切换到最新的 inner Observable.
     * 即只要有新的 inner Observable 吐出, 就退订当前的 inner Observable, 并订阅这个最新的 inner Observable.
     */
    it('01', (cb) => {
        const ho$ = interval(1000).pipe(
            take(3),
            map((i) =>
                interval(700).pipe(
                    take(2),
                    map((j) => `${i}:${j}`),
                ),
            ),
        );

        ho$.pipe(switchAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
