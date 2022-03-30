import { AsyncSubject, interval, share, take, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('AsyncSubject', () => {
    /**
     * AsyncSubject 会在上游完结时, 将上游最后一个数据吐出.
     * 如果上游已经完结了, 这时候下游再去订阅, 则下游会立即拿到这个数据.
     */
    it('01', (cb) => {
        const cold$ = interval(1000).pipe(take(3));

        const observable = cold$.pipe(
            logSubscribe(),
            tap((value) => log(`-----| ${value}`)),
            share({
                connector: () => new AsyncSubject(),
                resetOnError: false,
                resetOnComplete: false,
                resetOnRefCountZero: false,
            }),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            // 此时上游已经完结, 下游订阅之后直接拿到数据
            observable.subscribe({
                next: (value) => log(`-------------------------| ${value}`),
                complete: () => {
                    log('COMPLETE');
                },
            });
        }, 1000 * 5);

        setTimeout(() => cb(), 1000 * 10);
    });
});
