# Root 导航

> [!tip]
> 如果是初次 Root，请先看[Root 方案分析和对比](./comparison_and_warn.md)，然后按照下面的提示查找对应教程。

> [!important] 一个时代结束了...
> [1.5.04.445 修复了免解锁漏洞](/faq.md#注释-3-关于免解锁刷机)，如果可能，请解锁刷机。

> [!danger] GKI 弃用提示
> KernelSU 官方维护的 GKI 内核已经停止更新。
>
> 小新 Pad Pro GT 刷入 GKI 内核进行 Root 后，在恢复出厂时可能会出现卡第一屏 / 第二屏的问题。要解决这个问题，请将活动插槽的 `boot` 镜像替换为原厂镜像。
>
> 基于以上考虑，我们不再推荐使用 GKI 作为设备获取 Root 的方式。请参考 [Root 导航](./state_machine.md) 中使用 LKM 模式获取 Root 的教程获取 Root ，或者对于**已经使用 GKI 获取 Root 的用户**，先参考还原原厂 `boot` 镜像的 [教程](./unroot_gki.md) 还原镜像，然后使用 LKM 获取 Root 。

## 初次 Root

<a id="GKI_Root_Steps"></a>

~~1. 无 Root 到 GKI Root：~~

~~[点击跳转 - 刷写 GKI Root](./flash_gki_root.md)~~

<a id="LKM_Root_Steps"></a>

2. 无 Root 到 LKM Root：有两种解决方案。

- 使用 9008 刷写镜像：[点击跳转 - 使用 9008 刷写 LKM Root](./flash_lkm_root_9008.md)

- 先刷入 TWRP ，然后使用TWRP一键安装 KernelSU LKM：

  第一步：[点击跳转 - 刷写 TWRP](./flash_twrp.md)

  第二步：[点击跳转 - 使用 TWRP 一键安装 KernelSU LKM](./flash_lkm_root_twrp.md)

  > [!note]
  > 两种解决方案是等效的。

## Root 实现之间转换

<a id="GKI_To_LKM"></a>

1.  GKI Root 到 LKM Root：

第一步：[点击跳转 - 解除 Root ：GKI Version](./unroot_gki.md)

第二步：[点击跳转（本页面内的内容） - LKM Root](#LKM_Root_Steps)

<a id="LKM_To_GKI"></a>

2.  LKM Root 到 GKI Root：

第一步：[点击跳转 - 解除 Root ：LKM Version](./unroot_lkm.md)

第二步：[点击跳转（本页面内的内容） - GKI Root](#GKI_Root_Steps)

## 解除 Root

<a id="UnRoot"></a>

1. GKI Root 到 无 Root：[点击跳转 - 解除 Root ：GKI Version](./unroot_gki.md)

2. LKM Root 到 无 Root：[点击跳转 - 解除 Root ：LKM Version](./unroot_lkm.md)
