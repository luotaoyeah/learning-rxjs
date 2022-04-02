import { asapScheduler, observeOn, range } from 'rxjs';
import { log } from '../../util';

describe('observeOn', () => {
    /**
     * 对上游数据流应用指定的 scheduler.
     */
    it('01', (cb) => {
        const source$ = range(1, 3);

        log('BEFORE');

        source$.pipe(observeOn(asapScheduler, 1000)).subscribe({
            next: (value) => log(`----------| ${value}`),
            complete: () => log(`COMPLETE`),
        });

        log('AFTER');
    });
});
