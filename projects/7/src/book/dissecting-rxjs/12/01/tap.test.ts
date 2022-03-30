import { interval, map, take, tap } from 'rxjs';
import { log } from '../../util';

describe('tap', () => {
    /**
     *
     */
    it('01', (cb) => {
        const source$ = interval(1000).pipe(take(5));

        const source02$ = source$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                unsubscribe: () => console.log('UNSUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
                complete: () => log('COMPLETE'),
            }),
            map((i) => {
                log('-----| map');
                return i;
            }),
            tap({
                subscribe: () => log('2 | SUBSCRIBE'),
                unsubscribe: () => console.log('2 | UNSUBSCRIBE'),
                complete: () => log('2 | COMPLETE'),
            }),
        );

        const subscription01 = source02$.subscribe({
            next: (value) => {
                log(`---------------| NEXT | ${value}`);
            },
            complete: () => {
                log('---------------| COMPLETE');
            },
            error: (e) => {
                log(`---------------| ERROR | ${e.message}`);
            },
        });

        setTimeout(() => {
            subscription01.unsubscribe();
        }, 4000);

        source02$.subscribe({
            next: (value) => {
                log(`-------------------------| NEXT | ${value}`);
            },
            complete: () => {
                log('-------------------------| COMPLETE');
            },
            error: (e) => {
                log(`-------------------------| ERROR | ${e.message}`);
            },
        });
    });
});
