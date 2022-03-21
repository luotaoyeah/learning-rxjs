import { concat, count, startWith, tap, timer } from 'rxjs';
import { log } from '../../util';

describe('count', () => {
    it('01', (cb) => {
        const ho$ = concat(timer(1000), timer(1000));

        ho$.pipe(
            // 记录订阅时间
            startWith('订阅'),
            tap((value) => value === '订阅' && log(value)),
            count(),
        ).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
