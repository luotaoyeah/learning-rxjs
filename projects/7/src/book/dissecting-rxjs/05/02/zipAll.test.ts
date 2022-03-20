import { interval, map, take, zipAll } from 'rxjs';
import { log } from '../../util';

describe('zipAll', () => {
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

        ho$.pipe(zipAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
