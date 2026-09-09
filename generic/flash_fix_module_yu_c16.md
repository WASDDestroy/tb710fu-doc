---
output: word_document
---
# ColorOS 16 修复模块刷入指南

> [!danger]
> 此修复模块仅适配酷安 [@兰微卡鱼](https://www.coolapk.com/u/22567520) 为 TB710FU （小新平板 Pro GT）制作的 ROM!

修复模块（修复套件）由酷安 [@ACLaniakea](https://www.coolapk.com/u/34574766) 制作，遵循 GPL-3.0 协议（`kernel-compat/` 下的内核模块源码为 GPL-2.0）开源免费发布。项目尚在高速迭代中，本教程以版本 `v4.0.1` 为例说明此修复套件的刷入方法。

## 基础准备
1. 平板已经刷入兰微卡鱼版 ColorOS 16
2. 平板已 Root
3. 平板已解锁 Bootloader
   > [!note] 免解锁使用修复模块？
   > 修复模块内置了内核实现，包括 boot(GKI 通用内核映像) + vendor_boot(供应商内核映像)，免解锁不签名直接刷会报错。
   > 要使用免解锁，参考本教程 [恢复 AOSP 信任链](../without_unlock/high_versions/restore_trust_chain_on_android.md) 一节为镜像签名后刷入。说的更具体些：
   > - 本包不需要替换 abl 镜像
   > - 需要签名/生成下面的镜像：
   >   - boot          (替换成修复模块提供的镜像)
   >   - dtbo          (来自刷机包的镜像)
   >   - init_boot     (来自刷机包的镜像，并且已经经过系统内的管理器修补，以便 Root)
   >   - pvmfw         (来自刷机包的镜像)
   >   - recovery      (来自刷机包的镜像)
   >   - vendor_boot   (替换成修复模块提供的镜像)
   >   - vbmeta        (签名时生成，不需要提取原始镜像)
   >   - vbmeta_system (签名时生成，不需要提取原始镜像)
4. 了解如何刷入和删除模块，并知道怎么打开模块 WebUI 和 LSPosed 管理器

## 下载修复模块套件

由于修复套件包含需要使用电脑刷入的内核映像和在平板上安装的模块两种组件，推荐在电脑上下载，下载完毕后复制一份到平板上。

- 源站：[GitHub Releases](https://github.com/ACLaniakea/coloros-pad-fixes/releases/latest)
- 网盘：[移动云盘](https://yun.139.com/shareweb/#/w/i/2xG3scdDv13pe) 提取码: `a65b`

## 文件对照

以下五个部分互不干扰，可以独立刷入。

1. 手写笔三件套：
   - PenBridge-Root-v4.0.1.zip
   - PenBridge-Hook-v4.0.1.apk
   - PenHidCtl-v4.0.1.apk
2. 内核与内核模块：
   - boot-ACLaniakea-SM8650Q-droidspaces-r1.img
   - vendor_boot-hyperSched-stub.img
   - OplusBSP-Modules-v4.0.1.zip
3. 调度器：
   - SM8650Q-Scene-Scheduler-v4.0.1.zip
4. 基础修复：
   - FixModule-v4.0.1.zip
   - BaseFix-Hook-v4.0.1.apk
5. 相机移植：
   - LenovoPadProGT-ZUI-Camera-Port-v4.0.1.zip
   - ZUI-Camera-Compat-v4.0.1.apk
6. 校验值汇总：
   - SHA256SUMS-v4.0.1.txt

以上共 12 个文件。

完成下载后，你需要根据校验值汇总文档依次校验每个组件的 SHA256 ，并重新下载校验值和汇总文档记载值不匹配的组件。


## 刷入基础设施
从 KernelSU 模块仓库下载下面三个模块的最新版本并安装，装完重启：
- Hybrid Mount
- Zygisk Next
- LSPosed
推荐安装顺序为 `Zygisk Next -> LSPosed -> Hybrid Mount`, 可节省提前安装元模块导致的一次重启。

如果你的网络环境不佳，可以在“下载修复模块套件”一节中的网盘链接找到已经测试通过的三个基础模块，下载安装即可。

安装后按照下面的检查点确保模块正常工作：

- Hybrid Mount 提示 `运行中喵~`
- LSPosed: 点击 `执行`, 能够打开 LSPosed 管理器界面。
- Zygisk Next 提示 `[√ Zygote, Root: √ KernelSU (32601), ZL]`
  > [!note]
  > 1. "Root" 后跟着的是你的 Root 实现。如果你用的是 Magisk 或者不同版本、不同分支的 KernelSU ，这里显示的内容将会多少有些不一样。
  > 2. 如果 Zygisk Next 提示 `[× Stop zygisk due to crash, Root: √ KernelSU (32601), ZL]` 但是 LSPosed 管理器可以正常打开，则这个报错可以暂时忽略。

<img src="../media/flash_fix_module_yu_c16/common/kernelsu_module_page_infrastructure_ready.jpg" height="1000" />

如果以上三个模块全部正常工作，就可以继续。否则卸载并重新安装模块。

> [!important]
> 刷完基础设施之后，你可以根据你的需要刷入部分或者全部修复模块。教程接下来的每一节会分别讲解“文件对照”中的某个部分的修复应该如何使用。

## 安装手写笔修复
先安装组件：
1. 刷入模块 `PenBridge-Root-v4.0.1.zip`
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/kernelsu_module_install_page_stylus_bridging.jpg" height="1000" />
2. 安装应用 `PenBridge-Hook-v4.0.1.apk`
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/mt_app_install_page_stylus_bridging.jpg" height="1000" />
3. 安装应用 `PenHidCtl-v4.0.1.apk`
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/mt_app_install_page_hid_service.jpg" height="1000" />

安装完成之后：
1. 打开 LSPosed 管理器
   <img src="../media/flash_fix_module_yu_c16/common/lsposed_home_page.jpg" height="1000" />
2. 点击 `模块`
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/lsposed_module_page_stylus_bridging_disabled.jpg" height="1000" />
3. 点击 `联想平板 Pro GT - 手写笔桥接`
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/lsposed_scope_page_stylus_bridging_disabled.jpg" height="1000" />
4. 打开 `启用模块` 的开关
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/lsposed_scope_page_stylus_bridging_enabled.jpg" height="1000" />
5. 这时候管理器应该自动勾选了下列作用域： 
   - 系统框架 (system)
   - 便签 (com.coloros.note)
   - 健康数据平台 (com.oplus.healthservice)
   - 截屏 (com.oplus.screenshot)
   - 设备空间 (com.heytap.mydevices)
   - 无线设置 (com.oplus.wirelesssettings)
   - 系统服务 (com.oplus.exsystemservice)
   - 智能外设 (com.oplus.ipemanager)
如果没有勾选：
- 点击界面右上角的 `...` 图标打开下拉菜单
  <img src="../media/flash_fix_module_yu_c16/stylus_bridging/lsposed_scope_page_stylus_bridging_open_dropdown.jpg" height="1000" />
- 选择 `勾选推荐` 后确定选择推荐的应用
  <img src="../media/flash_fix_module_yu_c16/stylus_bridging/lsposed_scope_page_stylus_bridging_dialog_select_recommended.jpg" height="1000" />

完成安装后：
1. **重启一次平板**
2. 将手写笔吸附到磁吸充电位置
3. 打开蓝牙并连接手写笔
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/system_settings_page_connect_stylus.jpg" height="1000" />
4. 看到手写笔弹窗后即可使用全部 ColorOS 手写笔功能
   <img src="../media/flash_fix_module_yu_c16/stylus_bridging/system_settings_page_stylus_popup.jpg" height="1000" />

如果你的手写笔已经吸附在充电位置，但是还没有被识别，请拿起并重新吸附一次。

> [!note]
> 连接成功之后，手写笔弹窗可能会有所延迟，这是正常的。
>
> 如果你在成功连接手写笔蓝牙后 20 秒内都没看到状态弹窗或者手写笔功能介绍弹窗，则需要从本节开头重新检查一遍操作步骤，必要的时候重装模块。

## 安装内核和配套内核模块

### 刷入内核
1. 在电脑上 [安装 ADB 工具](./flash_unlocked_device.md#安装-adb-工具)、[Fastboot 驱动](./flash_unlocked_device.md#安装刷机驱动)，并 [打开平板的 USB 调试](./flash_unlocked_device.md#打开-usb-调试)
2. 将平板使用 USB 线连接到电脑
3. 在你于电脑端下载修复模块的目录下按住 `Shift` 按键并按鼠标右键打开菜单，点击 `在此处打开 PowerShell 窗口`
   <img src="../media/flash_fix_module_yu_c16/kernel/open_context_menu.png" height="1000" />
   > [!important]
   > 如果你从网盘下载镜像，请前往 `内核` 目录后再按上面的指示操作。
4. 将平板重启到 Bootloader 模式，有两种办法：
   - 在电脑端使用 ADB 命令，需要平板端授权使用此电脑进行 USB 调试：`adb reboot bootloader`
   - 拔掉平板的数据线，将平板关机。关机后按住 `电源 + 音量上`，进入 Bootloader 界面后松开（为防止误触开机，建议先松开电源键，再松开音量键），重新插回数据线
5. 在电脑上输入命令 `fastboot devices` 确定是否有设备接入，如果没有，尝试重新插拔一次数据线后再检查一次。若还是没有，你需要使用 9008 刷入镜像。
6. 使用命令 `fastboot flash` 刷入对应分区镜像：
   ```PowerShell
   fastboot flash boot boot-ACLaniakea-SM8650Q-droidspaces-r1.img
   fastboot flash vendor_boot vendor_boot-hyperSched-stub.img
   ```
7. 开机，有下面三种方法：
   - 通过音量键选择选项，直到平板屏幕上显示绿色的 `START` 字样，此时可以按电源键确认开机。
   - 使用命令 `fastboot continue`
   - 使用命令 `fastboot reboot`

完整的命令操作流程请见下图：

<img src="../media/flash_fix_module_yu_c16/kernel/command_screen.png" height="1000" />

### 刷入内核模块
按照上一小节完成内核刷入后，在管理器内刷入内核模块 `OplusBSP-Modules-v4.0.1.zip`:

<img src="../media/flash_fix_module_yu_c16/kernel/kernelsu_module_install_page_oplus_bsp.jpg" height="1000" />

安装完毕后，重启即可使用 tango 转译器等 ColorOS 内核级功能。

## 安装定制调度器
> [!note]
> 定制调度器和 Scene 协作，Scene 不是一个免费软件。该软件提供 14 天/设备的免费试用，超过试用期后，你需要为软件支付费用。
>
> 如果不想付费，可以尝试开源的 Scene 4。

1. 安装应用 [Scene](https://omarea.com/#/)：
   <img src="../media/flash_fix_module_yu_c16/govornor/mt_app_install_page_scene.jpg" height="1000" />
2. 授予 Scene Root 权限并使用软件中的 Root 模式。如果软件提示登陆账号或者充值，请根据指示操作。完成后将见到下面的界面：
   <img src="../media/flash_fix_module_yu_c16/govornor/scene_home_page_with_root.jpg" height="1000" />
3. 在管理器内刷入模块 `SM8650Q-Scene-Scheduler-v4.0.1.zip`
   <img src="../media/flash_fix_module_yu_c16/govornor/kernelsu_module_install_page_govornor.jpg" height="1000" />
4. 重启平板即可在 Scene 的 `调节` 选项卡下使用调度模块:
   <img src="../media/flash_fix_module_yu_c16/govornor/scene_adjusting_page.jpg" height="1000" />

## 安装基础修复模块

> [!tip]
> 修复用的 KernelSU 模块内已经内置了一个修复 Hook 模块，因此，如果你通过 SHA256 校验确定修复套件内单独提供的 BaseFix APK 文件和模块 ZIP 内提供的 APK 文件完全一致，可以跳过安装应用并勾选作用域的步骤（1 到 6 步）。

1. 安装应用 `BaseFix-Hook-v4.0.1.apk`
   <img src="../media/flash_fix_module_yu_c16/base_fix/mt_app_install_page_base_fix.jpg" height="1000" />
2. 打开 LSPosed 管理器
   <img src="../media/flash_fix_module_yu_c16/common/lsposed_home_page.jpg" height="1000" />
3. 点击 `模块`
   <img src="../media/flash_fix_module_yu_c16/base_fix/lsposed_module_page_base_fix_disabled.jpg" height="1000" />
4. 点击 `联想平板 Pro GT - ColorOS 基础修复`
   <img src="../media/flash_fix_module_yu_c16/base_fix/lsposed_scope_page_base_fix_disabled.jpg" height="1000" />
5. 打开 `启用模块` 的开关
   <img src="../media/flash_fix_module_yu_c16/base_fix/lsposed_scope_page_base_fix_enabled.jpg" height="1000" />
6. 这时候管理器应该自动勾选了下列作用域：
   - 系统框架 (system)
   - 常用信息与密码 (com.coloros.codebook)
   - 电池 (com.oplus.battery)
   - 平板管家 (com.coloros.phonemanager)
   - 设备快连 (com.heytap.accessory)
   - 设置 (com.android.settings)
   - 系统界面 (com.android.systemui)
   - 小布扫一扫 (com.coloros.ocrscanner)
   - AONService (com.aiunit.aon)
   - OpenID (com.heytap.openid)
   - StdSP Core (com.oplus.stdsp)
如果没有勾选：
- 点击界面右上角的 `...` 图标打开下拉菜单:
  <img src="../media/flash_fix_module_yu_c16/base_fix/lsposed_scope_page_base_fix_open_dropdown.jpg" height="1000" />
- 选择 `勾选推荐` 后确定选择推荐的应用：
  <img src="../media/flash_fix_module_yu_c16/base_fix/lsposed_scope_page_base_fix_dialog_select_recommended.jpg" height="1000" />
7. 刷入模块 `FixModule-v4.0.1.zip`：
   <img src="../media/flash_fix_module_yu_c16/base_fix/kernelsu_module_install_page_base_fix.jpg" height="1000" />
8. 重启一次平板

## 安装相机移植模块

1. 刷入模块 `LenovoPadProGT-ZUI-Camera-Port-v4.0.1.zip`
   <img src="../media/flash_fix_module_yu_c16/camera/flash_module.jpg" height="1000" />
2. 重启一次平板后若发现相机桌面图标异常：
   <img src="../media/flash_fix_module_yu_c16/camera/abnormal_desktop_icon.jpg"/>
   
   则从第一步要求你刷入的修复模块中提取相机 APK 安装：

   <img src="../media/flash_fix_module_yu_c16/camera/camera_apk_path.jpg" height="1000" />

3. 安装 `ZUI-Camera-Compat-v4.0.1.apk`
   <img src="../media/flash_fix_module_yu_c16/camera/mt_install_camera_compat.jpg" height="1000" />
4. 打开 LSPosed 管理器
   <img src="../media/flash_fix_module_yu_c16/common/lsposed_home_page.jpg" height="1000" />
5. 点击 `模块`
   <img src="../media/flash_fix_module_yu_c16/camera/lsposed_modules_page.jpg" height="1000" />
6. 点击 `联想平板 Pro GT - ZUI 相机兼容`
   <img src="../media/flash_fix_module_yu_c16/camera/lsposed_scope_page_disabled.jpg" height="1000" />
7. 打开 `启用模块` 的开关
   <img src="../media/flash_fix_module_yu_c16/camera/lsposed_scope_page_enabled.jpg" height="1000" />
8.  这时候管理器应该自动勾选了下列作用域：
   - 相机 (com.zui.camera)
如果没有勾选：
- 点击界面右上角的 `...` 图标打开下拉菜单：
  <img src="../media/flash_fix_module_yu_c16/camera/lsposed_scope_page_dropdown.jpg" height="1000" />
- 选择 `勾选推荐` 后确定选择推荐的应用：
  <img src="../media/flash_fix_module_yu_c16/camera/lsposed_scope_page_dialog.jpg" height="1000" />

## 问题解答
1. 找不到 `PenBridge-Root-v4.0.1.zip` 或者其它版本的手写笔 KernelSU 模块？
   - 找 `PenBridge-Module-v4.0.1.zip` 。
2. 可以使用其它元模块实现吗？
   - 测试使用的是 Hybrid Mount, 其它元模块实现未测试。
3. 可以单独刷内核，不刷 OplusBSP 模块吗？
   - 不可以，会导致 tango 转译器崩溃。即便你不使用 32 位应用，转译器崩溃也会占用系统资源用于转储崩溃日志。
4. 可以单独刷 OplusBSP 模块，不刷修复内核吗？
   - 不行，会卡在联想 Logo 界面，然后黑屏进入 900e 模式。
5. 手写笔修复不工作？
   - 检查元模块是否正常工作，是否更新到**最新版本**。
   - 检查是否安装了**最新版** Zygisk Next 和 LSPosed
   - 检查手写笔修复 Hook 模块 `PenBridge-Hook-v4.0.1.apk` 是否已在 LSPosed 管理器内激活，并勾选了全部推荐作用域。
   - 检查是否安装了手写笔修复 KernelSU 模块 `PenBridge-Root-v4.0.1.zip`
   - 检查是否安装了手写笔修复 HID 模块 `PenHidCtl-v4.0.1.apk`
6. 可以单独刷某个模块吗？
   - “文件对照”一节中，处于同一分组内的模块或者镜像要一起刷，不然刷了也没用。（尤其是内核组，如果只刷 `boot` 不刷 `vendor_boot`, 或者反过来，都会不开机）
7. Zygisk Next 提示 `[× Stop zygisk due to crash, Root: √ KernelSU (32601), ZL]` 之类的错误提示？
   - 打开 Zygisk Next 的 WebUI。如果 zygote64 成功注入但是 zygote32 和监视器崩溃，那一般是你刷了修复模块配套的内核后没有刷 BSP 模块，导致 tango 转译器无法正确加载。安装这个模块即可解决。
8. Magisk 用户能使用自带的 Zygisk 吗？
   - 未测试，不建议这么做。
9. Magisk 用户怎么使用 WebUI？
   - 安装 [KSU WebUI Standalone](https://github.com/5ec1cff/KsuWebUIStandalone/releases/latest)，注意此软件需要 Root。