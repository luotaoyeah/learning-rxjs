/*
 * 3.1 为什么要有操作符
 */

function fn01(): Array<number> {
  /*
   * 在介绍 rxjs 中的 operator 之前, 我们先来看一下 js 中 array 的相关方法,
   * 如下的 filter() 和 map() 方法, 可以对原数组进行过滤和映射, 并且原数组不会被改变,
   * 并且它们返回的还是一个数组, 因此可以进行链式调用
   */
  const arr01: Array<number> = [1, 2, 3, 4];
  return arr01.filter(i => i % 2 === 0).map(i => i * 2);
}

export { fn01 };
