import { interval, publish, refCount, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('publish', () => {
    /**
     * publish() 等于 multicast(new Subject())
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            logSubscribe(),
            tap((value) => log(`-----| ${value}`)),
            publish(),
            refCount(),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
