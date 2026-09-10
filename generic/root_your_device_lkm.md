LKM 模式会修补设备的 `ramdisk`。刷 Root 的步骤如下：
1. 确定内核版本，从内核版本推断出 `KMI` 版本和 `ramdisk` 位置；
2. 获取存放了 `ramdisk` 的分区镜像；
3. 根据 `KMI` 修补 `ramdisk` 分区镜像；
4. 将修补后的分区镜像刷入**对应分区**。

在 Android 系统内，`ramdisk` 位于：
- 如果你的内核版本为 5.10 或者更早，则 `ramdisk` 位于 `boot` 分区内；
- 如果你的内核版本为 5.15 或者更高，则 `ramdisk` 位于 `init_boot` 分区内。

本教程以小新平板 Pro GT 为例说明使用 LKM 模式实现 Root 的流程。

## 确定内核版本并推断必要信息
1. 打开平板上的设置应用，找到 *关于平板电脑* 选项：
<img src="../media/generic/unlock_lkm_root/android_about_page.jpg" height=1000>
2. 在 *关于平板电脑* 屏幕内找到 *软件版本* 一行并点击进入：
<img src="../media/generic/unlock_lkm_root/android_about_page.jpg" height=1000>
3. 现在来看内核版本号，比如我这里是 `6.1.157-android14-11-g82d681c9b06b-ab14634535`, 对应可以解析出下面的信息：
    - 内核 KMI 为 `6.1-android14-11`
    - 内核版本为 `6.1`, 大于 `5.15`, 则 `ramdisk` 镜像位于 `init_boot` 分区

确定完内核版本号之后就可以开始正式流程了。

## 获得 ramdisk 所在的分区镜像
上一节提到本设备需要提取 `init_boot` 镜像，主流的提取方法有下面三种：
1. 获取设备对应版本的**全量卡刷包**下载链接，用 Payload Dumper 等工具在线流式提取 `payload.bin` 中的 `init_boot` 分区镜像；
2. 获取设备对应版本的全量卡刷包或者线刷包（含 9008 救砖包）下载链接，下载到本地后解压压缩文件，找到 `init_boot` 分区镜像；
3. 从设备提取 `init_boot` 分区镜像，主要是使用 9008 。
> [!tip]
> 