import { defaultIfEmpty, EMPTY, interval, take } from 'rxjs';
import { log } from '../../util';

describe('defaultIfEmpty', () => {
    /**
     * 如果上游为空, 则吐出默认数据; 否则不做任何操作.
     */
    it('01', (cb) => {
        EMPTY.pipe(defaultIfEmpty('EMPTY')).subscribe({
            next: (value) => log(value),
            complete: () => cb(),
        });
    });

    it('02', (cb) => {
        interval(1000)
            .pipe(take(3), defaultIfEmpty('EMPTY'))
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
