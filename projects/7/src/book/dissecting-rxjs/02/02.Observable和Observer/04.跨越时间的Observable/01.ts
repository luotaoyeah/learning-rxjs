import { Observable } from 'rxjs';

const source$ = new Observable<number>((subscriber) => {
    let n = 1;

    // 由 Observable 控制推送数据的节奏, 每隔一秒推送一个数据
    const handle = setInterval(() => {
        subscriber.next(n++);

        if (n > 3) {
            clearInterval(handle);
        }
    }, 1000);
});

source$.subscribe({
    next: (data) => {
        console.log(data);
    },
});
