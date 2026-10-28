# 修补 Ramdisk 获取 Root

> [!warning]
> 本教程适合解锁了 Bootloader 的设备。

## 概要

Magisk, KernelSU 以及它们的分支通过修补设备的 `ramdisk` 加载二进制实现 Root。本教程以 KernelSU LKM 模式为例说明小新平板 Pro GT 刷 Root 的流程。

刷 Root 的步骤如下：

1. 确定内核版本，从内核版本推断出 `KMI` 版本和 `ramdisk` 位置；
2. 获取存放了 `ramdisk` 的分区镜像；
3. 根据 `KMI` 修补 `ramdisk` 分区镜像；
4. 将修补后的分区镜像刷入**对应分区**。

为了保证增量 OTA 顺利，要修补对应当前系统版本的 `ramdisk` 所在分区镜像。如果你不需要增量 OTA ，可以尝试修补相近版本的镜像。

在 Android 系统内，`ramdisk` 位于：

- 如果你的内核版本为 5.10 或者更早，则 `ramdisk` 位于 `boot` 分区内；
- 如果你的内核版本为 5.15 或者更高，则 `ramdisk` 位于 `init_boot` 分区内。

## 确定内核版本并推断必要信息

1. 打开平板上的设置应用，找到 *关于平板电脑* 选项：
<img src="../media/generic/unlock_lkm/android_about_page.jpg" height=1000>

2. 在 *关于平板电脑* 屏幕内找到 *软件版本* 一行并点击进入：
<img src="../media/generic/unlock_lkm/android_kernel_version.jpg" height=1000>

3. 现在来看内核版本号，比如我这里是 `6.1.157-android14-11-g82d681c9b06b-ab14634535`, 对应可以解析出下面的信息：
    - 内核 KMI 为 `6.1-android14-11`
    - 内核版本为 `6.1`, 大于 `5.15`, 则 `ramdisk` 镜像位于 `init_boot` 分区

确定完内核版本号之后就可以开始正式流程了。

## 必要准备

在电脑上按照 [解锁教程](./flash_unlocked_device.md) 指引安装刷机驱动和 ADB 工具，并在平板端打开 USB 调试。

如果你还没有解锁 Bootloader, 跟随解锁教程操作即可。

> [!important]
> USB 调试在平板每次开机后接收来自电脑的第一条 ADB 指令时都需要你授权，因此你要留意平板上的授权弹窗。如果你在第一次授权的时候勾选了 `始终允许此计算机进行 USB 调试` 则后续不需要再行授权。

## 获得 ramdisk 所在的分区镜像

上一节提到本设备需要提取 `init_boot` 镜像，主流的提取方法有下面三种：

1. 获取设备对应版本的**全量卡刷包**下载链接，用 Payload Dumper 等工具在线流式提取 `payload.bin` 中的 `init_boot` 分区镜像；
2. 获取设备对应版本的全量卡刷包或者线刷包（含 9008 救砖包）下载链接，下载到本地后解压压缩文件，找到 `init_boot` 分区镜像；
3. 从设备提取 `init_boot` 分区镜像，主要是使用 9008 。

> [!tip]
> 还可以在提权后使用 dd 或者 cat 命令提取镜像。此外，部分设备支持 fastboot fetch 读取镜像。

对于小新平板 Pro GT:

- 官方极少放出全量卡刷包，第一条路行不通
- 官方 9008 救砖包通常晚大规模发版几天，有的时候延后非常严重，第二条路也不一定总是行得通’
- 官方提供了自由读写的 9008 引导

因此可走的路只有第三条。请跟随以下步骤操作：

1. 进入 9008 模式，有以下三种办法，根据你的情况选一种即可：
   - （需授权 USB 调试） 使用命令 `adb reboot edl`
   - （部分版本不稳定） 拔掉 USB 线（如连接），将平板彻底关机。按住平板的 `音量上` 不放，同时插入 USB 线，期间保持音量键被按住不放。看到平板屏幕亮起充电符号并熄灭，电脑提示有设备接入后，就可以松手了。
   - （需要二代工程线） 拔掉 USB 线（如连接），将平板彻底关机。按住二代高通工程线上的按钮不放，将工程线连上平板，电脑提示有设备接入后就可以松手了。
2. 打开刷机匣软件，点击 `QC/高通` 下的 `深度刷机` 选项进入深刷页面：
   <img src="../media/generic/unlock_lkm/gft_edl_page.jpg" height=1000>
3. 点击 `选择设备/引导/配置`，打开下面的窗口，点击窗口中的 `...` 按钮打开文件选择页面：
   <img src="../media/generic/unlock_lkm/gft_melf_selecting_page.jpg" height=1000>
4. 在文件选择页面中选择解压好的 9008 引导（文件名为 `xbl_s_devprg_ns.melf`）。这个引导文件可以在 [资源下载](./resource_download.md) 找到：
   <img src="../media/generic/unlock_lkm/gft_saf_melf_file.jpg" height=1000>
5. 选择完引导文件之后的页面是这样的，点击确认返回到深度刷机页面：
   <img src="../media/generic/unlock_lkm/gft_melf_selected.jpg" height=1000>
6. 点击深度刷机页面的 `读信息`：
   <img src="../media/generic/unlock_lkm/gft_click_read_info.jpg" height=1000>
7. 等待信息读取完成会看到这样的页面，记住这里的活动槽位：
   <img src="../media/generic/unlock_lkm/gft_current_slot.jpg" height=1000>
8. 在搜索框输入 `init_boot`, 软件自动过滤出 A 和 B 插槽的两个 init_boot 分区：
   <img src="../media/generic/unlock_lkm/gft_search_init_boot.jpg" height=1000>
9. 本例中插槽为 A ,因此勾选 `init_boot_a` 分区：
    <img src="../media/generic/unlock_lkm/gft_select_partition.jpg" height=1000>
10. 勾选完毕后点击 `回读`，选择一个保存位置后确定：
    <img src="../media/generic/unlock_lkm/gft_select_readback_directory.jpg" height=1000>
11. 软件自动完成读取操作，读取完成后点击日志页面的 `重启至` 选择重启到 `系统模式`：
    <img src="../media/generic/unlock_lkm/gft_reboot_to_system.jpg" height=1000>

## 修补分区镜像

1. 回读镜像在你选择的目录下以 `GeekFlashTool` 开头的文件夹中：
   <img src="../media/generic/unlock_lkm/windows_readback_file_at.jpeg" height=1000>
2. 将分区镜像放到你的平板的存储中：
   <img src="../media/generic/unlock_lkm/windows_copy_file_to_tablet.jpeg" height=1000>
3. 安装 KernelSU 并打开，会看到此时 KernelSU 提示未安装：
   <img src="../media/generic/unlock_lkm/kernelsu_not_installed.jpg" height=1000>
4. 点击 `未安装` 打开镜像修补页面，选择 `选择一个文件并修补` 后在你的文件管理器中找到刚刚传输到平板的 `init_boot` 镜像：
   <img src="../media/generic/unlock_lkm/kernelsu_select_a_file.jpg" height=1000>
5. 现在应该回到镜像修补页面，由于我们保证当前镜像就是原厂镜像，可以勾选 `备份为原厂镜像` 方便在增量系统更新时还原镜像：
   <img src="../media/generic/unlock_lkm/kernelsu_backup_as_stock_image.jpg" height=1000>
6. 点按 `下一步` ，按照最开始的推断选择 KMI 为 `android14-6.1` 并点确认：
   <img src="../media/generic/unlock_lkm/kernelsu_select_kmi.jpg" height=1000>
7. KernelSU 将输出修补日志，提示 `刷写完成` 即为修补成功：
   <img src="../media/generic/unlock_lkm/kernelsu_patch_log.jpg" height=1000>

## 复制镜像到电脑

1. 重新插拔一次 USB 线，让平板重新握手 MTP 刷新文件列表；
2. 从平板的 `Download` 目录复制文件名开头为 `kernelsu_patched_` 的镜像到电脑存储：
   <img src="../media/generic/unlock_lkm/windows_patched_file_at.jpeg" height=1000>

## 刷入修补后的镜像

1. 将平板重启到 Bootloader 模式，有下面两种方法，根据你的情况选一种即可：
   - （需授权 USB 调试） 使用命令 `adb reboot bootloader`
   - （需要手法）拔掉 USB 线（如连接），将平板彻底关机。按住平板的 `电源` 和 `音量上` 不放。看到平板屏幕亮起绿色的 `START` 文字，就可以松手了。

   > [!tip]
   > 使用第二种办法进入 Bootloader 模式后，建议先松开按住电源键的手指，再松开按住音量键的手指，以防误触让平板重新开机。

2. 在电脑上导航到你放置修补文件的文件夹，按住 `Shift` 按键不放，同时单击鼠标右键，打开上下文菜单：
   <img src="../media/generic/unlock_lkm/open_context_menu.png" height=1000>
3. 选择 `在此处打开 PowerShell 窗口` 打开一个命令提示符窗口：
4. 要用命令 `fastboot flash init_boot <文件名>` 来刷入镜像：
   - 命令中的 `<文件名>` 等会要被替换成你修补的镜像文件的实际名称，三种方法选其一：
       - （最优）可以将镜像文件直接拖进命令行窗口
       - （也不是不行）可以复制镜像文件的文件名并粘贴进命令行窗口，注意命令行中粘贴用的是鼠标右键
       - （万不得已不要选）也可以手动输入文件名......但是真的不会偶然敲错吗？

       > [!warning]
       > 如果复制了镜像文件的名称或者手动输入了文件名，且文件名不是以 `.img` 结尾，你需要手动加上这个结尾！
   - 完成输入后回车刷入。
5. 刷完之后输入 `fastboot reboot` 或者 `fastboot continue` ，回车，平板将自动开机。

这里提供所有命令运行后的参考：

<img src="../media/generic/unlock_lkm/windows_command_overview.jpg" height=1000>

## 确认 KernelSU 正常工作

1. 平板开机后打开 KernelSU, 发现其显示 `工作中` 则 Root 成功：
   <img src="../media/generic/unlock_lkm/kernelsu_working.jpg" height=1000>

教程正文到此结束。

## 备注

1. 如果你的设备内核版本为 `5.10` 或者更早，则需要获取 `boot` 镜像、修补 `boot` 镜像、将 `boot` 镜像刷入 `boot` 分区。
2. KernelSU 会利用 Android SDK 读取内核版本，进而在修补页面提示你建议选择什么分区的镜像。本例中建议就是修补 `init_boot` 分区镜像。
3. 如果能找到全量包下载链接，就可以直接在 KernelSU 中流式下载镜像并自动修补。
4. 有的时候 MTP 可以自动刷新文件目录，这个时候点进 Download 文件夹能直接找到修补好的镜像，可以不重新插拔 USB 线。
5. 将 `boot` 镜像刷入 `init_boot` 时，Fastboot 软件会校验分区大小拒绝刷入，反之则不会拒绝。如果是这样，设备会在重启后直接进入 Bootloader 模式。要解决这种问题，看下一条：
6. 上一条的对策：获取你当前系统版本的 `boot` 分区镜像后用 `fastboot` 刷入到你设备的 `boot` 分区，然后按照下面的操作重新激活插槽：
   - 输入命令 `fastboot getvar current-slot` 获取当前活动插槽
   - 若活动插槽是 a, 输入命令 `fastboot set_active a`；若活动插槽是 b,  `fastboot set_active b`
   - 重启即可重新开机
7. 由于会显示解锁状态提示，`fastboot continue` 在你不做任何干预的情况下会耗时 10 秒钟左右。如果你希望跳过解锁警告，按两次电源键即可。
8. Bootloader 是一个模式，Fastboot 是 Android 实现的 Bootloader 软件，fastboot 是 Android SDK 的一部分。
