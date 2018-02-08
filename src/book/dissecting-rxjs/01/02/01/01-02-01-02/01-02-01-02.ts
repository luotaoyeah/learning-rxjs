import chalk from "chalk";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 纯函数（pure function）
   * 纯函数是指满足下面两个条件的函数：
   *     1. 输入决定输出：
   *          函数的执行过程和执行结果完全由输入参数决定，只要参数不变，无论执行多少次，执行结果都相同
   *     2. 无副作用：
   *          函数不会去修改任何外部的状态，包括不会去修改输入参数，不会去修改全局变量等等，
   *          简单来说，就是没有副作用（side effect）
   *
   * 如何判断某个函数是否是纯函数？
   *     1. 将该函数的调用替换为一个结果常量，观察程序运行结果是否一样，
   *        如果一样，它就是一个纯函数
   */

  /*
   * 下面的函数不是一个纯函数，因为它修改了输入参数
   */

  const impureFn01 = (arr: Array<number>, item: number): Array<number> => {
    arr.push(item);
    return arr;
  };

  const arr01 = [1, 2, 3];
  impureFn01(arr01, 4);
  console.assert(arr01.length === 4);
}

console.log(
  chalk.green("\n-------------------------------------------------- 02"),
);
{
  /*
   * 下面的函数是一个纯函数，它没有修改输入参数，返回的是一个新的数组
   */
  const pureFn01 = (arr: Array<number>, item: number): Array<number> => [
    ...arr,
    item,
  ];

  const arr01 = [1, 2, 3];
  pureFn01(arr01, 4);
  console.assert(arr01.length === 3);
}
