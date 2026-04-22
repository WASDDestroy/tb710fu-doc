# 关于各种 Root 方案的解析，以及 Root 之前你需要知道的事情

> [!warning]
> 以下内容仅适用于 TB710FU。

> [!danger] GKI 弃用提示
> KernelSU 官方维护的 GKI 内核已经停止更新。
>
> 小新 Pad Pro GT 刷入 GKI 内核进行 Root 后，在恢复出厂时可能会出现卡第一屏 / 第二屏的问题。要解决这个问题，请将活动插槽的 `boot` 镜像替换为原厂镜像。
>
> 基于以上考虑，我们不再推荐使用 GKI 作为设备获取 Root 的方式。请参考 [Root 导航](./state_machine.md) 中使用 LKM 模式获取 Root 的教程获取 Root ，或者对于**已经使用 GKI 获取 Root 的用户**，先参考还原原厂 `boot` 镜像的 [教程](./unroot_gki.md) 还原镜像，然后使用 LKM 获取 Root 。

## 方案解析 - GKI VS LKM

1. GKI 模式：KernelSU 最原始的 Root 实现方式，直接替换内核镜像。

   优点：
   - **全部版本、全部 ROM 通用**，包括所有版本的 ZUXOS、ColorOS 和 HyperOS
   - 9008模式下只需要刷写一个分区
   - 使用 `avbtool.py` 进行签名时不需要生成 `vbmeta` 。

   缺点：
   - 已知刷入后有功耗明显偏高的案例
   - 可能无法回到官方内核，表现为启动后卡在第一或者第二屏，如果能启动 `logcat` 抓日志，则能观察到大量提示性能胶合层错误的日志条目

2. LKM 模式（9008刷入）：通过修补 init_boot 实现 Root。

   优点：
   - 操作系统版本更新时"更加方便"
   - 不需要开发者*编译*内核

   缺点：
   - ~~需要开发者为每个版本提供一个拥有 AVB页脚 的 init_boot 和配套的 vbmeta 镜像~~

> [!tip] 关于隐藏性
> 一般讨论的隐藏都是基于 Bootloader 已解锁为前提所进行的操作。
>
> 既然 Bootloader 仍旧处于锁定状态， TEE 工作正常，平板也不需要运行银行类等检测严格的 APP ，那么为何需要纠结隐藏？

## 方案解析 - Magisk, KernelSU, KernelSU Next, SukiSU Ultra

1. Magisk

   优点：
   - 兼容性好，模块较多
   - 提供内置 Zygisk 实现
   - 弹窗申请 `su` ，操作直观

   缺点：
   - 修补 `init_boot` ，且需要在系统内完成修补（否则没法正确识别设备信息），暂时没有成熟易维护的 Root 方案。

2. KernelSU

   优点：
   - KSU系祖师爷，稳定性和安全性最佳
   - 内核态 Root 实现，提供极好的隐藏性
   - 使用 `元模块` 控制挂载行为，提供类似其他分支的特性
   - 严格的授权控制，允许控制用户 UID 和 GID

   缺点：
   - 需要在 管理器APP 内授权 Root，操作不如 Magisk 直观
   - 会生成稀疏文件，可能造成设备存储空间显示有误

3. KernelSU Next

   优点：
   - 为 KernelSU 引入了 Magic Mount 系统
   - 内核态 Root 实现，提供极好的隐藏性
   - 更佳的个性化功能
   - 严格的授权控制，允许控制用户 UID 和 GID

   缺点：
   - 需要在 管理器APP 内授权 Root，操作不如 Magisk 直观
   - 会生成稀疏文件，可能造成设备存储空间显示有误
   - 作者似乎曾陷入声誉风波

4. SukiSU Ultra

   优点：
   - 严格的授权控制，允许控制用户 UID 和 GID
   - 内核态 Root 实现，提供极好的隐藏性
   - 内置 susFS 和 KPM 支持
   - 支持 OverlayFS 和 Magic Mount
   - 极度强大的管理器自定义功能（现已转换到 MIUIX ，不确定自定义功能是否仍旧可用）
   - 非常ecy的杂鱼图标，在 MIUI / HyperOS 有特殊卸载提示词

   缺点：
   - bug 较多
   - 需要在 管理器APP 内授权 Root，操作不如 Magisk 直观
   - 会生成稀疏文件，可能造成设备存储空间显示有误

## 特别注意：Root之后...

1. 失去以较低劳动成本更新到高版本系统的可能。如有需要，具体参考[解除Root](./unroot.md)和[保留 用户数据 和 Root权限 进行系统增量更新](./update_while_keeping_root.md)
2. 不能使用需要刷写含有AVB页脚的分区的软件，例如 `Konabess` ，除非你知道如何使用 `avbtool.py` 对产出的镜像进行签名。
3. 软件可能检测到 Root 的痕迹，并进一步造成包括但不限于封号的后果
4. **刷入不正确的模块或者运行不正确的脚本会导致设备变砖。**
