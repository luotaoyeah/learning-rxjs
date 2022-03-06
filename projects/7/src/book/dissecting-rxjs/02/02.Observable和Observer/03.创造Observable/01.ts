import { NextObserver, Observable, Subscription } from 'rxjs';

// 发布者
const source$ = new Observable<number>((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
});

// 观察者
const theObserver: NextObserver<number> = {
    next: (item) => console.log(item),
};

// 订阅
const subscription: Subscription = source$.subscribe(theObserver);

setTimeout(() => {
    // 退订
    subscription.unsubscribe();
}, 1000);
