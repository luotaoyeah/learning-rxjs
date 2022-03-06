import { Observable } from 'rxjs';

const source$ = new Observable<number>((subscriber) => {
    let n = 1;

    const handle = setInterval(() => {
        console.log(`吐出数据: ${n}`);
        subscriber.next(n++);
    }, 1000);

    return {
        unsubscribe() {
            console.log('unsubscribe()');
        },
    };
});

const subscription = source$.subscribe((data) => {
    console.log(data);
});

setTimeout(() => {
    // 退订之后不再接收数据, 但是 Observable 依然在吐出数据
    subscription.unsubscribe();
}, 3000);
