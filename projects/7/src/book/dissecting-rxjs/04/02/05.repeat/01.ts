import { Observable, repeat } from 'rxjs';

// repeat(): 重复订阅上游 n 次, 上游完结之后就会立即再次订阅.

const source$ = new Observable((subscriber) => {
    console.log('subscribe');

    setTimeout(() => subscriber.next(1), 1000);
    setTimeout(() => subscriber.next(2), 2000);
    setTimeout(() => subscriber.next(3), 3000);
    setTimeout(() => subscriber.complete(), 4000);

    return {
        unsubscribe() {
            console.log('unsubscribe');
        },
    };
});

source$.pipe(repeat(2)).subscribe({
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('complete');
    },
});
