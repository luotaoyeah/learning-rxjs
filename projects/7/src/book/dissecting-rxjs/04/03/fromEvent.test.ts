import { fromEvent, take } from 'rxjs';
import { EventEmitter } from 'events';

describe('fromEvent', () => {
    /**
     * fromEvent() 将 DOM 事件或者 Node.JS 中的事件转换为 Observable.
     */
    it('01', (cb) => {
        const eventEmitter = new EventEmitter();

        fromEvent(eventEmitter, 'foo')
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
