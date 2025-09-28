# git reset 作用是啥，有哪些操作？【热度: 275】

- Issue: #557
- State: open
- Labels: 工程化, 快手
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/557
- Created: 2023-09-16T08:24:15Z
- Updated: 2023-09-16T08:24:16Z

## Body

**关键词**：git reset 作用、git reset 操作

git reset 是一个用于撤销提交的命令，可以将当前分支指向某个特定的提交，同时可以选择是否修改工作区和暂存区。

常见的 git reset 操作有以下三种：

1. git reset --soft <commit>：将当前分支的 HEAD 指向指定的 commit，并保留之后的修改。这种方式不改变工作区和暂存区的内容，可以用于撤销之前的提交，重新修改后重新提交。

2. git reset --mixed <commit>（默认操作）：将当前分支的 HEAD 指向指定的 commit，并取消之后的提交，但保留修改。这种方式会重置暂存区的内容，但不改变工作区的内容，可以用于撤销之前的提交，重新修改后重新提交。

3. git reset --hard <commit>：将当前分支的 HEAD 指向指定的 commit，并丢弃之后的修改。这种方式会重置工作区和暂存区的内容，慎用，会永久丢失未提交的修改。

除了上述操作之外，还可以搭配使用 git reset 的其他选项和参数。其中，<commit> 可以是一个提交的哈希值、分支名或者标签名，用于指定要回退到的提交。

