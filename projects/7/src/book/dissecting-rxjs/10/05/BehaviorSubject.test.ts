import { BehaviorSubject, interval, share, take, tap } from 'rxjs';
import { log } from '../../util';

describe('BehaviorSubject', () => {
    /**
     * BehaviorSubject 会指定一个默认值,
     * 当下游订阅时, 如果上游还未吐出数据, 则下游会立即收到这个默认值,
     * 当下游订阅时, 如果上游已经吐过数据, 则下游会立即收到上游最后吐的数据.
     */
    it('01', (cb) => {
        const cold$ = interval(1000).pipe(take(5));

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
            }),
            share({
                connector: () => new BehaviorSubject(9),
                resetOnError: false,
                resetOnComplete: false,
                resetOnRefCountZero: false,
            }),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 1000 * 3);

        setTimeout(() => {
            // 上游完结了我再去订阅,
            observable.subscribe({ next: (value) => log(`-----------------------------------| ${value}`) });
        }, 1000 * 7);
    });
});
