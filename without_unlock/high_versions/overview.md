# 高版本现状

## 什么是高版本

对于联想小新平板 Pro GT 来说，所谓的“高版本”指的是 `ZUXOS 1.5.04.445` **及以上**的系统版本。包含底包为大于等于该版本的第三方 ROM 。

这里只做举例，下面的版本都是“高版本”：

- 1.5.04.445
- 1.5.04.447
- 1.5.04.454
- 1.5.04.470
- 1.5.04.495
- 2.5.04.xxx（截至 2026.09.06 本机尚未推出 Android 17 测试版）

## 高版本带来的影响

1. Bootloader 换用联想自持有的密钥对，免解锁漏洞失效
2. TEE 不再损坏
3. 提供若干功能和稳定性改进（据称 Android 17 ZUXOS 改进较大）

最重要的是第一点。

## 对策

高版本用户请按照本分组下的教程，使用安卓应用 [AVBDroid](https://github.com/WASDDestroy/avbtool-android-compose/releases/latest) 或者跨平台 TUI/CLI 工具 [AVBPowerTool2](https://github.com/WASDDestroy/avbpowertool2) 重建信任链。

低版本用户也可以按照本目录下的教程操作以免解锁使用你的降压超频内核、第三方内核、Root 实现等，但是必要性没有高版本这么大。