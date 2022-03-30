import { distinctUntilKeyChanged, of, tap } from 'rxjs';
import { log } from '../../util';

describe('distinctUntilKeyChanged', () => {
    /**
     * 第 1 个参数 key 用来指定要比较哪个属性.
     */
    it('01', (cb) => {
        of('1', 'a', '22', 'bb')
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
                distinctUntilKeyChanged('length'),
                tap((value) => log(`distinctUntilKeyChanged: ${value}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });

    /**
     * 第 2 个参数 compare 用来指定比较方式.
     */
    it('02', (cb) => {
        of({ age: 4, name: 'Foo1' }, { age: 7, name: 'Bar' }, { age: 5, name: 'Foo2' }, { age: 6, name: 'Foo3' })
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${JSON.stringify(value)}`),
                }),
                distinctUntilKeyChanged('name', (x, y) => x.substring(0, 3) === y.substring(0, 3)),
                tap((value) => log(`distinctUntilKeyChanged: ${JSON.stringify(value)}`)),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });
    });
});
