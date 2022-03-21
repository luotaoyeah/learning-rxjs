import { EMPTY, interval, isEmpty, tap } from 'rxjs';
import { log } from '../../util';

describe('isEmpty', () => {
    /**
     * 判断上游是否为空, 何为空: 没有吐出数据就直接完结.
     */
    it('01', (cb) => {
        EMPTY.pipe(isEmpty()).subscribe({
            next: (value) => log(value),
            complete: () => cb(),
        });
    });

    it('02', (cb) => {
        interval(1000)
            .pipe(
                tap((value) => log(`上游:${value}`)),
                isEmpty(),
            )
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
