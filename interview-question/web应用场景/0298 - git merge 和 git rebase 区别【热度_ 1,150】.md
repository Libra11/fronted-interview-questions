# git merge 和 git rebase 区别【热度: 1,150】

- Issue: #298
- State: open
- Labels: web应用场景
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/298
- Created: 2023-04-18T16:20:56Z
- Updated: 2023-11-26T15:22:03Z

## Body

`git merge` 和 `git rebase` 都是用来合并不同分支的命令，但是它们的实现方式和结果不同。

`git merge` 会把两个分支的最新提交点合并起来，生成一个新的合并提交，并且会保留两个分支各自的提交记录，形成一条分支合并的历史线。合并后的代码中，两个分支的修改都会被保留下来。

`git rebase` 也是用来合并分支的，但是它会将当前分支的提交“移动”到目标分支的最后面，然后再将目标分支的修改合并进来。这个过程中，会改变当前分支的提交记录，使它看起来像是在目标分支上进行的修改，从而保持一条干净的提交历史。如果发生冲突，需要手动解决冲突并进行提交。

总的来说，`git merge` 适合用于简单的合并场景，保留分支历史记录，而 `git rebase` 则适合用于合并长期存在分支的场景，可以保持一个干净的提交历史。但是在合并公共分支时，使用 `git rebase` 可能会破坏代码的协作性，因此需要谨慎使用。


---------------------
补充更新：

假设你现在基于远程分支"origin"，创建一个叫"mywork"的分支。

`$ git checkout -b mywork origin`

![image](https://github.com/pro-collection/interview-question/assets/22188674/b40fdca9-4844-4996-b008-f24d0d486acb)

现在我们在这个分支做一些修改，然后生成两个提交(commit).

```
$ vi file.txt
$ git commit
$ vi otherfile.txt
$ git commit
...
```

但是与此同时，有些人也在"origin"分支上做了一些修改并且做了提交了. 这就意味着"origin"和"mywork"这两个分支各自"前进"了，它们之间"分叉"了。

![image](https://github.com/pro-collection/interview-question/assets/22188674/82286270-6422-4b34-a1b3-9d5367b50a78)

在这里，你可以用"pull"命令把"origin"分支上的修改拉下来并且和你的修改合并； 结果看起来就像一个新的"合并的提交"(merge commit):

![image](https://github.com/pro-collection/interview-question/assets/22188674/5f29e4cd-e1c5-4b8d-b4cd-2dd4db047e8a)

但是，如果你想让"mywork"分支历史看起来像没有经过任何合并一样，你也许可以用 `git rebase`

```
$ git checkout mywork
$ git rebase origin
```

这些命令会把你的"mywork"分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),然后把"mywork"分支更新 到最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。

![image](https://github.com/pro-collection/interview-question/assets/22188674/e0157351-163a-40e9-85d5-fbc1e35f5ba8)

当'mywork'分支更新之后，它会指向这些新创建的提交(commit),而那些老的提交会被丢弃。 如果运行垃圾收集命令(pruning garbage collection), 这些被丢弃的提交就会删除. 

![image](https://github.com/pro-collection/interview-question/assets/22188674/4937b995-8e48-4c32-b101-4fb551b60d01)

现在我们可以看一下用合并(merge)和用rebase所产生的历史的区别：

![image](https://github.com/pro-collection/interview-question/assets/22188674/0d85e67e-8366-4591-8118-50695129dd3c)
![image](https://github.com/pro-collection/interview-question/assets/22188674/b871d1a2-b8e5-4807-9b97-2de8ec103e07)

在rebase的过程中，也许会出现冲突(conflict). 在这种情况，Git会停止rebase并会让你去解决 冲突；在解决完冲突后，用"git-add"命令去更新这些内容的索引(index), 然后，你无需执行 git-commit,只要执行:

`$ git rebase --continue`

这样git会继续应用(apply)余下的补丁。

在任何时候，你可以用--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。

`$ git rebase --abort`



