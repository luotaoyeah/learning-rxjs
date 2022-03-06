import { Observable } from 'rxjs';

const source$ = new Observable<number>((subscriber) => {
    let n = 1;

    const handle = setInterval(() => {
        subscriber.next(n++);

        if (n > 3) {
            clearInterval(handle);
            subscriber.complete();
        }
    }, 1000);
});

source$.subscribe({
    next: (data) => {
        console.log(data);
    },
    complete: () => {
        console.log('No More Data');
    },
});
