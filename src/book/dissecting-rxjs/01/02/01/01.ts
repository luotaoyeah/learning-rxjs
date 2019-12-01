import chalk from 'chalk';

// 函数式编程（Functional Programming）中的 function 有以下几个特点:
//     1. 声明式（declarative）
//     2. 纯函数（pure function）
//     3. 不可变性（immutability）
//
// JS 不是一种纯粹的函数式编程语言, 但是可以用来编写函数式的代码

// 下面三个函数实现相同的功能, 但是具体的实现方式不一样, 越往下, 声明式的特点越明显

function double01(arr: Array<number>): Array<number> {
  const results: Array<number> = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
  }

  return results;
}

function double02(arr: Array<number>): Array<number> {
  return arr.map(function (i: number) {
    return i * 2;
  });
}

const double03 = (arr: Array<number>): Array<number> => arr.map((i: number) => i * 2);

export { double01, double02, double03 };
