import { of, pluck, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('pluck', () => {
    /**
     * 映射某个属性的值, 可以是嵌套的属性.
     */
    it('01', (cb) => {
        of({ x: { y: { z: 1 } } }, { x: { y: { z: 2 } } })
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${JSON.stringify(value)}`)),
                pluck('x', 'y', 'z'),
                tap((value) => log(`pluck: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });

    it('02', (cb) => {
        /**
         * 属性名可以是数组的索引.
         */
        of(['a', 'b', 'c'])
            .pipe(
                logSubscribe(),
                tap((value) => log(`上游: ${JSON.stringify(value)}`)),
                pluck(1),
                tap((value) => log(`pluck: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });
});
