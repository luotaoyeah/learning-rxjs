import { asapScheduler, interval, subscribeOn, take, tap } from 'rxjs';
import { log } from '../../util';

describe('subscribeOn', () => {
    /**
     * subscribeOn 控制订阅的时机, 默认是在调用 subscribe() 方法后立即同步订阅上游.
     */
    it('01', (cb) => {
        const source$ = interval(1000).pipe(take(3));

        log('BEFORE');

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                }),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => log(`COMPLETE`),
            });

        log('AFTER');
    });

    it('02', (cb) => {
        const source$ = interval(1000).pipe(take(3));

        log('BEFORE');

        source$
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                }),
                subscribeOn(asapScheduler, 1000),
            )
            .subscribe({
                next: (value) => log(`----------| ${value}`),
                complete: () => log(`COMPLETE`),
            });

        log('AFTER');
    });
});
