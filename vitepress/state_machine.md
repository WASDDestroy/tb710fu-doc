# Root 导航

> [!tip]
> 如果是初次 Root，请先看[Root 方案分析和对比](./comparison_and_warn.md)，然后按照下面的提示查找对应教程。

## 初次 Root

<a id="GKI_Root_Steps"></a>

1. 无 Root 到 GKI Root：

[点击跳转 - 刷写 GKI Root](./flash_gki_root.md)

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
