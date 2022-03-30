import { combineLatestAll, interval, map, take } from 'rxjs';
import { log } from '../../util';

describe('combineLatestAll', () => {
    it('01', (cb) => {
        const ho$ = interval(1000).pipe(
            take(2),
            map((i) =>
                interval(2000).pipe(
                    take(2),
                    map((j) => `${i}:${j}`),
                ),
            ),
        );

        ho$.pipe(combineLatestAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
