import { exhaustAll, interval, map, take } from 'rxjs';
import { log } from '../../util';

describe('exhaustAll', () => {
    /**
     * 当前的 inner Observable 完结之后, 才会去考虑新的 inner Observable.
     * 当前的 inner Observable 完结之前产生的新的 inner Observable, 会被丢弃.
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

        ho$.pipe(exhaustAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
