# 保留 用户数据 和 Root 权限进行系统增量更新

> [!warning]
> 此为进阶玩法，不建议没有命令行基础的用户进行操作。推荐先阅读 [dd 命令教程](../misc/dd_command.md)。
>
> 本玩法需要的原始镜像一般都可以在下载页找到，但是强烈建议自己在更新每个版本后都保留自己的 `boot` 镜像
>
> 感谢酷安 @墨染_nlx 的读写块设备方式！

> [!important]
> 为了正确应用增量更新，必须还原所有修改过的分区。
>
> 例如刷入了第三方 Recovery ，就需要还原当前活动插槽的 `recovery`  ；刷入了 `vendor_boot` 进行降压，就需要还原 `vendor_boot` 和 `vbmeta` 。
>
> 关于上面提及的 `vbmeta` ，请参考 [AVB 入门](../misc/avb_guide.md) 。

## GKI 模式

> [!important] 一个时代结束了...
> [1.5.04.445 修复了免解锁漏洞](../generic/faq.md#注释-3-关于免解锁刷机)，如果可能，请解锁刷机。

> [!danger] GKI 弃用提示
> KernelSU 官方维护的 GKI 内核已经停止更新。
>
> 小新 Pad Pro GT 刷入 GKI 内核进行 Root 后，在恢复出厂时可能会出现卡第一屏 / 第二屏的问题。要解决这个问题，请将活动插槽的 `boot` 镜像替换为原厂镜像。
>
> 基于以上考虑，我们不再推荐使用 GKI 作为设备获取 Root 的方式。建议您尽快参考还原原厂 `boot` 镜像的 [教程](./unroot_gki.md) 还原镜像，如有需要，再使用 LKM 获取 Root 。

### Step 1:

关闭所有模块，重启设备。

### Step 2:

重启后在内置存储根目录放置原始 `boot` 镜像 `original.img` 和拥有 Root 的镜像（以 `KernelSU` 为例） `ksu.img` 。确认自己设备的槽位：

```bash
su -c getprop ro.boot.slot_suffix
```

如果返回 `_a` ，说明现在在 `A` 槽，如果返回 `_b` ，说明当前在 `B` 槽。
现在在拥有 Root 权限的终端模拟器输入下面的命令：
如果当前在 `A` 槽位：

```bash
su -c dd if=/sdcard/original.img of=/dev/block/by-name/boot_a
```

如果当前在 `B` 槽位：

```bash
su -c dd if=/sdcard/original.img of=/dev/block/by-name/boot_b
```

**现在不要重启设备！**

### Step 3:

正常更新系统。如成功，转到 [步骤5](#update_while_keeping_root_step5) ，如失败，转到 [步骤4](#update_while_keeping_root_step4)。

### Step 4:

如果更新进度条没走完就提示 _当前已是最新版本_ 并收到 _安装更新失败_ 的通知，说明本方法不适合，用 `dd` 命令刷回你原来的镜像：<a id="update_while_keeping_root_step4"></a>

- 如果当前在 `A` 槽位：

  ```bash
  su -c dd if=/sdcard/ksu.img of=/dev/block/by-name/boot_a
  ```

- 如果当前在 `B` 槽位：

  ```bash
  su -c dd if=/sdcard/ksu.img of=/dev/block/by-name/boot_b
  ```

### Step 5:

在提示 _重启设备以完成更新_ 时，回到终端模拟器 _依次键入_ 下面的命令：<a id="update_while_keeping_root_step5"></a>

- 如果当前在 `A` 槽位，重启后会处于 `B` 槽位：

```bash
su
blockdev --setrw /dev/block/by-name/boot_b
dd if=/dev/block/by-name/boot_b of=/sdcard/next_version_boot.img
dd if=/sdcard/ksu.img of=/dev/block/by-name/boot_b
blockdev --setro /dev/block/by-name/boot_b
```

- 如果当前在 `B` 槽位，重启后会处于 `A` 槽位：

```bash
su
blockdev --setrw /dev/block/by-name/boot_a
dd if=/dev/block/by-name/boot_a of=/sdcard/next_version_boot.img
dd if=/sdcard/ksu.img of=/dev/block/by-name/boot_a
blockdev --setro /dev/block/by-name/boot_a
```

### Step 6:

重启设备，完成系统更新。现在应当仍旧拥有 Root 权限。

## LKM 模式

> [!important] 一个时代结束了...
> [1.5.04.445 修复了免解锁漏洞](../generic/faq.md#注释-3-关于免解锁刷机)，如果可能，请解锁刷机。

> [!danger] 不推荐保 Root 更新
> 操作更加复杂且签名步骤容易出错。推荐系统更新时使用 9008 还原原厂镜像，更新后重新提取当前系统的 `init_boot` 和 `vbmeta` 签名后刷入以重新获取 Root 权限。

1. 关闭所有模块并重启。
2. 放置**当前版本的原厂镜像**到内置存储的根目录，`init_boot` 镜像命名为 `original_init_boot.img` ， `vbmeta` 镜像命名为 `original_vbmeta.img` 。
3. 还原当前版本系统的原厂镜像到**目前活动的插槽**，包括 `init_boot` 和 `vbmeta`：
   - 先查看当前插槽：`su -c getprop ro.boot.slot_suffix`。`_a`:：A 插槽；`_b`：B 插槽。
   - 刷写镜像：
      ```shell
      # 当前为 A 插槽
      su
      dd if=/sdcard/original_init_boot.img of=/dev/block/by-name/init_boot_a
      dd if=/sdcard/original_vbmeta.img of=/dev/block/by-name/vbmeta_a
      exit
      ```

      ```shell
      # 当前为 B 插槽
      su
      dd if=/sdcard/original_init_boot.img of=/dev/block/by-name/init_boot_b
      dd if=/sdcard/original_vbmeta.img of=/dev/block/by-name/vbmeta_b
      exit
      ```
4. 进行系统更新。
5. 完成系统更新后使用 Termux 版 / MT 版一键签名工具提取**新系统**的 `init_boot` 和 `vbmeta` 镜像并备份。
   
   ```shell
   # 当前为 A 插槽，重启后为 B 插槽
   su
   dd if=/dev/block/by-name/init_boot_a of=/sdcard/next_version_init_boot.img
   dd if=/dev/block/by-name/vbmeta_a of=/sdcard/next_version_vbmeta.img
   exit
   ```

   ```shell
   # 当前为 B 插槽，重启后为 A 插槽
   su
   dd if=/dev/block/by-name/init_boot_b of=/sdcard/next_version_init_boot.img
   dd if=/dev/block/by-name/vbmeta_b of=/sdcard/next_version_vbmeta.img
   exit
   ```
6. 复制一份上述两个镜像到签名工具的目录，使用工具的 `非链式.sh` 签名上面提取的两个镜像；
   > [!important]
   > 始终确保自己留有镜像的一份备份，否则将无法接受增量更新。
   >
   > 工具需要 Python 3 环境。且由于 Android 严格的权限管理，工具很可能因为各种原因找不到 Python 而报错。
   >
   > 如果无法运行，请考虑使用 Root 权限。
   >
   > 对于终端模拟器用户， `cd` 到 `/data/media/0` 后找到工具目录输入 `./非链式.sh` 。
   >
   > 对于 GUI 用户，使用文件管理器访问 `/data/media/0` 后找到工具目录，运行 `非链式.sh` 。
7. 将签好名的镜像命名为 `signed_init_boot.img` 和 `signed_vbmeta.img` 放置到内置存储的根目录。
8. 刷入镜像到更新后的活动插槽：
   ```shell
   # 当前为 A 插槽，重启后为 B 插槽
   su
   blockdev --setrw /dev/block/by-name/init_boot_b
   blockdev --setrw /dev/block/by-name/vbmeta_b
   dd if=/sdcard/signed_init_boot.img of=/dev/block/by-name/init_boot_b
   dd if=/sdcard/signed_vbmeta.img of=/dev/block/by-name/vbmeta_b
   blockdev --setro /dev/block/by-name/init_boot_b
   blockdev --setro /dev/block/by-name/vbmeta_b
   exit
   ```

   ```shell
   # 当前为 B 插槽，重启后为 A 插槽
   su
   blockdev --setrw /dev/block/by-name/init_boot_a
   blockdev --setrw /dev/block/by-name/vbmeta_a
   dd if=/sdcard/signed_init_boot.img of=/dev/block/by-name/init_boot_a
   dd if=/sdcard/signed_vbmeta.img of=/dev/block/by-name/vbmeta_a
   blockdev --setro /dev/block/by-name/init_boot_a
   blockdev --setro /dev/block/by-name/vbmeta_a
   exit
   ```
9. 重启设备完成系统更新。