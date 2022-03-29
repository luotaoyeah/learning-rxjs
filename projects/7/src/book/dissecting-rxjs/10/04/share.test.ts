import { interval, share, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('share', () => {
    /**
     * share() 等于 multicast(() => new Subject()).refCount()
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            logSubscribe(),
            tap((value) => log(`-----| ${value}`)),
            share(),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
