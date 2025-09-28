# [React] useEffect的第二个参数，如何判断依赖是否发生变化？

- Issue: #179
- State: open
- Labels: web框架
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/179
- Created: 2023-03-26T08:36:21Z
- Updated: 2023-03-26T08:37:57Z

## Body

`useEffect`的第二个参数是一个依赖数组，用于判断副作用函数的依赖是否发生变化。React使用JavaScript的`Object.is`方法来判断依赖项是否发生变化。在比较依赖项时，React首先检查依赖项的值是否相等。如果依赖项的值是引用类型，React会比较它们的引用地址，而不是比较它们的属性值。因此，在比较引用类型时，即使对象具有相同的属性值，但它们的引用地址不同，React仍然认为它们是不同的。

需要注意的是，如果依赖项是一个数组或对象，由于它们是引用类型，因此即使数组或对象中的元素或属性没有发生变化，但数组或对象本身的引用地址发生变化，也会导致React重新执行副作用函数。在这种情况下，我们可以使用`useCallback`和`useMemo`来缓存回调函数和计算结果，以便避免在依赖数组发生变化时重新计算和创建。
