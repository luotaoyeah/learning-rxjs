import { interval, map, ReplaySubject, share, Subject, take, tap } from 'rxjs';
import { log } from '../../util';

describe('ReplaySubject', () => {
    /**
     * ReplaySubject 会缓存上游数据, 可以指定缓存 N 个数据(缓存最新的 N 个数据, 否则缓存所有数据).
     * 当有新的下游订阅时, 会将缓存的数据一次性吐给下游.
     *
     * 当上游完结之后, 下游再来订阅, 此时下游不会去订阅上游, 而是直接一次性获得缓存的数据,
     * 这样就避免了重新订阅上游, 又重新走一遍所有的管道.
     */
    it('01', (cb) => {
        const cold$ = interval(1000).pipe(take(5));

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
            }),
            share({
                connector: () => new ReplaySubject(3),
                resetOnError: false,
                resetOnComplete: true,
                resetOnRefCountZero: false,
            }),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 1000 * 3);

        setTimeout(() => {
            // 上游完结了我再去订阅:
            //   1. 如果用的是 Subject, 则会重新订阅上游冷流
            //   2. 如果用的是 ReplaySubject
            //        如果 resetOnComplete: false, 则不会订阅上游冷流, 而是直接一次性获得缓存数据
            //        如果 resetOnComplete: true,  则会去订阅上游冷流
            observable.subscribe({ next: (value) => log(`-----------------------------------| ${value}`) });
        }, 1000 * 7);
    });
});
