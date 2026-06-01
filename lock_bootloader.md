---
output: word_document
---

# 为您的联想小新 Pad Pro GT 锁定 Bootloader

## 概述

锁定 Bootloader 前最关键的准备工作是**将受到 AVB2.0 保护的镜像全都恢复成原厂状态**。

**锁定 Bootloader 和解锁一样，会清除用户数据。**

## 还原分区镜像以防 AVB 验证出错

要还原这些分区：

- 非 super 分区：boot, dtbo, init_boot, pvmfw, recovery, vbmeta, vbmeta_system, vendor_boot
- super 内的分区：odm, product, system, system_dlkm, system_ext, vendor, vendor_dlkm

如何还原？

先备份 persist 分区。

1. 如果记得刷了哪些镜像并且能找到对应的备份：通过合适方式刷入对应分区的备份镜像即可
2. 啥都不记得就直接覆盖救砖包：[救砖](/unbrick_device.md)

## 锁定 Bootloader

1. 在电脑端安装好 adb 工具和驱动。
2. 平板重启到 Bootloader(Fastboot) 模式：
   - Approach 1: 平板拔线关机，按住电源键和音量上键即可进入，界面应当有红色的 **unlocked** 字样。
   - Approach 2: 平板处于开机状态，保证 USB 调试打开，在电脑打开命令提示符(Win + R, 输入 cmd)后再输入 `adb reboot bootloader`
3. 输入命令 `fastboot flashing lock` 。
4. 在平板上使用音量上下键选中 **LOCK THE BOOTLOADER** 后按电源键确认即可。
5. 平板会自动重启清除用户数据。