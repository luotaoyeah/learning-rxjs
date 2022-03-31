import { interval, map, publish, refCount, share, shareReplay, tap } from 'rxjs';
import { log } from '../../util';

describe('publish', () => {
    /**
     * publish() 等于 multicast(new Subject())
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
            }),
            publish(),
            refCount(),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });

    it('02', (cb) => {
        const cold$ = interval(1000);

        const observable01$ = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(value),
            }),
            publish(),
            refCount(),
        );

        // observable01$ 是一个热流, 但是后面加上 pipe 之后得到的 observable02$ 是一个冷流,
        // 因此 observable02$ 的每个下游收到的数据, 都会过一遍 pipe,
        // 为了解决这个问题, 我们可以在 pipe 的最后使用 shareReplay (或者其他多播操作符), 将 observable02$ 重新变成一个热流
        const observable02$ = observable01$.pipe(
            map((value) => {
                log(`map | ${value}`);
                return value;
            }),
            shareReplay(1),
        );

        observable02$.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable02$.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
