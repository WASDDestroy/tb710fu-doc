---
output: word_document
---

# 通过 9008 刷入备份

遵循以下步骤：

## Step 1
平板 `进入 9008 模式`，电脑 `安装好刷机驱动`，解压刷机包并放在一个合适的位置。打开匣，**选择引导文件**，用 `读信息` 按钮确定设备和引导文件状态正常。

> [!note]
> 如果你看不明白以上任何一步的内容，跳转到 [刷机前准备](../generic/before_flashing.md)来学习。

## Step 2
在匣的主页面，找到 `选择 XML` 按钮。点击打开二级页面。

![](../media/without_unlock/image68.webp)

## Step 3
在打开的二级页面中，找到你解压刷机包的目录，里面应当存在 `rawprogram.xml` 。将它们**全部选中**，并点击打开：

![](../media/without_unlock/image69.webp)

> [!note]
> 如果有 patch.xml，则应一起选中。

打开之后检查匣是否正确加载了镜像文件，正确的情况就像 *下面* 这样：

![](../media/without_unlock/image70.webp)

如果镜像文件路径不正确，用 `选择 XML` 按钮右侧的 `选择镜像目录` 手动指定镜像的存储位置

## Step 4
现在可以开始刷机了，点击主界面上的 `刷入` 按键，耐心等待进度条走完。

> [!tip]
> 使用 USB3 传输效果更佳 —— 如果你有合适的设备！

## Step 5
进度条走完后，点一次 **重设当前槽位**

## 如果卡第一屏

需要修复 `persist` 分区。参考 [GSN 修复教程](../generic/fix_gsn.md)解决问题。

## 如果卡第二屏

### Step 1
最后，点击 **恢复出厂设置** 中的 **通用**，平板会自动重启到 `Recovery` 模式。

![](../media/without_unlock/image71.webp)

### Step 2
在 `Recovery` 模式中，点击 `Wipe` 按钮（中文界面中的"清除"），然后点击 `Format data`（中文界面中的 `格式化 data 分区`），最后用键盘输入 `yes`，点击右下角的 `√ 按钮`，即可顺利清除分区，重启到系统。
