/*
 * 2.6 弹珠图
 */

import chalk from "chalk";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 弹珠图 (marble diagram) 是 observable 数据流的一种图形化的表示方式,
   * 横向的箭头线代表时间的流逝, 每一个推送的数据就像这条线上的一个一个的弹珠,
   * 其中竖线 (|) 代表的是 Subscriber.complete(), (x) 代表的是 Subscriber.error()
   */
}

console.log(
  chalk.yellow("\n-------------------------------------------------- 02"),
);
{
  /*
   * 对于 operator 来说, 每一个 operator 都会接收上游数据,
   * 然后对数据进行处理, 最后交给下游,
   * 因此, 在有 operator 的弹珠图中, 通常有多条时间线, 每一条线都对应一个数据流
   */
}

export {};
