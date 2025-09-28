# 在做 eslint 和 commitlint 的时候， 可以使用 --no-verify 跳过， 这种情况下该如何强制卡点【热度: 233】

- Issue: #772
- State: open
- Labels: 工程化, 美团
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/772
- Created: 2024-05-26T03:26:19Z
- Updated: 2024-05-26T03:26:20Z

## Body

**关键词**：commit 与 eslint 规范

跳过`eslint`和`commitlint`的钩子，使用`--no-verify`（对于`git commit`来说是`-n`），的确是一个容许开发者在紧急情况下超越钩子检查的手段。然而，这也削弱了代码质量保证的制度。以下是一些方法，可以用来加强这些卡点的靠谱办法：

- **CI/CD 流水线中增加检查**：在你的 CI/CD 流程中增加`eslint`和`commitlint`的检查步骤。如果检查失败，则阻止代码合并或部署。

- **强制挂钩**：虽然开发者可能在本地禁用钩子，但你不能控制别人的本地环境。相反，你可以编写服务器端的钩子，比如在 Git 仓库的服务器上使用`pre-receive`钩子，来拒绝不符合规范的提交。

- **定期自动化检查**：定期运行一个自动化的脚本或 GitHub Action，检查代码库的 eslint 与 commitlint 违规情况，并自动创建一个修复问题的 issue 或拉取请求。

你可以最大限度地减少绕过`eslint`和`commitlint`检查的情况。然而，值得记住的是，在极少数情况下，可能存在合法的理由需要紧急提交代码。因此，为了灵活性和效率，完全禁止`--no-verify`可能不是一个最佳的选择。好的实践中应该找到安全和灵活性之间的平衡，核心在于建立一个质量意识，制定明智的操作规范。

