# 请设计一个算法, 将两个有序数组合并为一个数组, 请不要使用concat以及sort方法

可以使用双指针法来合并两个有序数组。具体步骤如下：

1. 创建一个新的数组来存储合并后的结果。
2. 初始化两个指针，分别指向两个数组的起始位置。
3. 比较两个指针所指向的元素，将较小的元素添加到新数组中，并将对应指针向后移动一位。
4. 重复步骤3，直到其中一个数组的指针超出了数组的范围。
5. 将剩余的未合并元素直接添加到新数组的末尾。
6. 返回新数组作为结果。

以下是用 JavaScript 实现的代码：

```javascript
function mergeArrays(arr1, arr2) {
  const merged = [];
  let i = 0; // 第一个数组的指针
  let j = 0; // 第二个数组的指针

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // 将剩余的未合并元素添加到新数组的末尾
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

// 示例
const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8];
const mergedArray = mergeArrays(arr1, arr2);
console.log(mergedArray); // 输出 [1, 2, 3, 4, 5, 6, 7, 8]
```

这个算法的时间复杂度是 O(n)，其中 n 是两个数组的总长度。

## Comments / Answers

---

**lzdml** at 2023-07-25T05:19:39Z

上面的代码确定没问题吗,
如left和right如下结果
let left = [1, 7, 4, 8, 9, 10];
      let right = [2, 5];

---

**lzdml** at 2023-07-25T05:32:45Z

需要处理while循环结束之后比较的最后一位, 所以还需要用while去处理第一个循环结束之后两边数组剩余的元素


```
function merge(left, right) {
        if (!Array.isArray(left) || !Array.isArray(right)) {
          throw new Error("Both parameters must be arrays.");
        }

        let leftIndex = 0,
          rightIndex = 0;
        let result = [];
        let leftLen = left.length;
        let rightLen = right.length;

        while (leftIndex < leftLen && rightIndex < rightLen) {
          if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
          } else {
            result.push(right[rightIndex++]);
          }
        }
        console.log("result :>> ", result);

        // 处理剩余的元素
        while (leftIndex < leftLen) {
          result.push(left[leftIndex++]);
        }

        while (rightIndex < rightLen) {
          result.push(right[rightIndex++]);
        }

        return result;
      }
```


---

**yanlele** at 2023-07-25T06:09:13Z

> 上面的代码确定没问题吗, 如left和right如下结果 let left = [1, 7, 4, 8, 9, 10]; let right = [2, 5];

@lzdml 难得有小伙伴会认真看内容；感谢你的回复；

这个题目是：本来两个数组就是有序的。 

如果本身两个数组就是无序的情况复杂对会增加非常多。

---

**yanlele** at 2023-07-25T06:11:19Z

> 需要处理while循环结束之后比较的最后一位, 所以还需要用while去处理第一个循环结束之后两边数组剩余的元素
> 
> ```
> function merge(left, right) {
>         if (!Array.isArray(left) || !Array.isArray(right)) {
>           throw new Error("Both parameters must be arrays.");
>         }
> 
>         let leftIndex = 0,
>           rightIndex = 0;
>         let result = [];
>         let leftLen = left.length;
>         let rightLen = right.length;
> 
>         while (leftIndex < leftLen && rightIndex < rightLen) {
>           if (left[leftIndex] < right[rightIndex]) {
>             result.push(left[leftIndex++]);
>           } else {
>             result.push(right[rightIndex++]);
>           }
>         }
>         console.log("result :>> ", result);
> 
>         // 处理剩余的元素
>         while (leftIndex < leftLen) {
>           result.push(left[leftIndex++]);
>         }
> 
>         while (rightIndex < rightLen) {
>           result.push(right[rightIndex++]);
>         }
> 
>         return result;
>       }
> ```

@lzdml emmm， 确实是实现有问题， 丢了最后一位

---

**yanlele** at 2023-07-25T06:12:03Z

@lzdml 已更新

---

**BruceYuj** at 2025-02-20T08:32:59Z

双指针合并即可