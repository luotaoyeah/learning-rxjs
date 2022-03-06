import { Observable } from 'rxjs';

const source$ = new Observable<number>((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
});

// 每个订阅者接收到的都是从头开始吐出的所有数据, 这种 Observable 叫做 Cold Observable, 类似于视频点播,
// 反之叫做 Hot Observable, 类似于视频直播

source$.subscribe((data) => {
    console.log('001: ' + data);
});

source$.subscribe((data) => {
    console.log('002: ' + data);
});
