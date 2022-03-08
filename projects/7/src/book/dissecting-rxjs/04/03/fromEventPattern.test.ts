import { fromEventPattern, take } from 'rxjs';
import { EventEmitter } from 'events';

/**
 * 如果事件对象的类型不匹配 fromEvent(), 则可以使用 fromEventPattern().
 */
describe('fromEventPattern', () => {
    it('01', (cb) => {
        const eventEmitter = new EventEmitter();

        fromEventPattern(
            (handler) => {
                eventEmitter.addListener('foo', handler);
            },
            (handler) => {
                eventEmitter.removeListener('foo', handler);
            },
        )
            .pipe(take(3))
            .subscribe({
                next: (value) => {
                    console.log(value);
                },
                complete: () => cb(),
            });

        eventEmitter.emit('foo', 1);
        // bar 事件不会被监听
        eventEmitter.emit('bar', 4);
        eventEmitter.emit('foo', 2);
        eventEmitter.emit('foo', 3);
    });
});
