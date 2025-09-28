# A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态？(了解即可)

- Issue: #197
- State: open
- Labels: 网络, 网易
- Author: yanlele
- URL: https://github.com/pro-collection/interview-question/issues/197
- Created: 2023-03-26T10:46:47Z
- Updated: 2023-03-26T10:46:48Z

## Body

当 B 机器重启时，TCP 连接会被断开，此时 A 机器会检测到 TCP 连接异常断开，将 TCP 状态修改为 FIN\_WAIT\_1 状态。A 机器会继续等待来自 B 机器的响应，如果等待的时间超过了一定时间（通常为几分钟），A 机器会放弃等待并关闭 TCP 连接，将 TCP 状态修改为 CLOSED 状态。
