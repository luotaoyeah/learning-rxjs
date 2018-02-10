/*
 * 4.1 创建类操作符
 */

/*
 * 所谓的创建类操作符, 指的是不依赖于上游的 observable 对象, 而是直接从其他数据源创建出 observable 对象,
 * 比如从一个数组创建出 observable 的 from 操作符,
 * 比如从多个数值创建出 observable 的 of 操作符,
 * 比如从 DOM 事件创建出 observable 的 fromEvent 操作符,
 *
 * 创建类操作符是数据流的源头
 */
