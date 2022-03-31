import { interval, ReplaySubject, share, shareReplay, tap } from 'rxjs';
import { log } from '../../util';

describe('shareReplay', () => {
    /**
     * shareReplay(1)
     *   等于
     * share({
     *     connector: () => new ReplaySubject(1),
     *     resetOnError: true,
     *     resetOnComplete: false,
     * })
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(value),
            }),
            share({
                connector: () => new ReplaySubject(1),
                resetOnError: true,
                resetOnComplete: false,
            }),
        );

        observable.subscribe({ next: (value) => log(`----------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`--------------------| ${value}`) });
        }, 3000);
    });

    it('02', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(value),
            }),
            shareReplay(2),
        );

        observable.subscribe({ next: (value) => log(`----------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`--------------------| ${value}`) });
        }, 3000);
    });
});
