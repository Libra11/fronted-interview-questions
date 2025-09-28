# JavaScript 对象的底层数据结构是什么【热度: 517】

- Issue: #338
- State: open
- Labels: JavaScript
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/338
- Created: 2023-05-05T15:59:29Z
- Updated: 2023-05-05T15:59:29Z

## Body

**关键词**：JavaScript 对象数据结构

在JavaScript中，对象是一种无序的键值对集合，可以保存和传递信息。对象是一种非常重要的数据类型，在JavaScript中，几乎所有东西都是对象。

在底层，JavaScript对象的数据结构是哈希表（Hash Table），也可以称为散列表。哈希表是一种使用哈希函数将键值映射到数据中的位置的数据结构。它允许效率高且快速地插入、查找和删除数据，这些操作在算法的平均情况下都需要常数时间。哈希表的主要思想是将键值对转换为索引的方式在常数时间内获取值，因此哈希表非常适合用于大量的键值对数据存储。

在JavaScript中，对象的键值对存储使用了类似哈希表的技术。JavaScript引擎使用一个称为哈希表种子的随机数字来计算键的哈希值，然后使用头插法（链表或树）将键和值存储在桶中，以实现高效的插入和查询操作。因此，JavaScript对象在实现上使用了哈希表来存储和访问键值对，从而提供了非常高效的数据存储和查找操作，使之成为了编写JavaScript代码的强大工具。

