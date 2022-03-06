import { Observable } from 'rxjs';

const source$ = new Observable<number>((subscriber) => {
    subscriber.next(1);

    // Observable 只有一种完结状态, 要么 complete, 要么 error,
    // 调用 error() 之后再调用 error() / complete() / next() 无效,
    // 调用 complete() 之后再调用 error() / complete() / next() 也无效,
    subscriber.error('Someting Wrong');
    subscriber.next(2);
    subscriber.complete();
    subscriber.error('Someting Wrong 02');
});

source$.subscribe({
    next: (data) => {
        console.log(data);
    },
    complete: () => {
        console.log('No More Data');
    },
    error: (err) => {
        console.log(err);
    },
});
