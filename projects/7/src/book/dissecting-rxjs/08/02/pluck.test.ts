import { of, pluck, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('pluck', () => {
    it('01', (cb) => {
        /**
         * 映射某个属性的值, 可以是嵌套的属性.
         */
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
                    log(e.message);
                    cb();
                },
            });
    });
});
