// observer pattern

// RxJS 中最重要的两个概念:
//     Observable（被观察的）
//     Observer  （在观察的）
//
// RsJS 中的数据流, 指的就是 Observable 对象
//
// Observable 实现了两种设计模式:
//     观察者模式（Observer Pattern）
//     迭代器模式（Iterator Pattern）
//
// 观察者模式, 包含两个对象:
//     publisher
//         Observable 对象就是其中的 publisher, 它负责产生事件, 推送数据
//     observer
//         Observer 对象就是其中的 observer, 它负责订阅事件, 处理数据
