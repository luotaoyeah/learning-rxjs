import { interval } from 'rxjs';

// interval(): 类似于 setInterval(), 按指定的时间间隔, 从 0 开始吐出递增 1 的整数

interval(1000).subscribe((value) => {
    console.log(value);
});
