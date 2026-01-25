# 保留 Root 权限进行系统更新

> [!warning]
> 此为进阶玩法，不建议没有命令行基础的用户进行操作。
> 
> 本玩法需要的文件应当都可以在群文件中找到，但是强烈建议自己在更新每个版本后都保留自己的 `boot` 镜像
> 
> 感谢群友@T_T的读写块设备方式！



## **Step 1**:
关闭所有模块，重启设备。

## **Step 2**:
重启后在内置存储根目录放置原始 `boot` 镜像 `original.img` 和拥有 Root 的镜像（以 `KernelSU` 为例） `ksu.img` 。确认自己设备的槽位：
   
   ```bash
   su -c getprop ro.boot.slot_suffix
   ```
   
   如果返回 `_a` ，说明现在在 `A` 槽，如果返回 `_b` ，说明当前在 `B` 槽。
   现在在拥有 Root 权限的终端模拟器输入下面的命令：
   如果当前在 `A` 槽位：
   
   ```bash
   su -c dd if=original.img of=/dev/block/by-name/boot_a
   ```
   
   如果当前在 `B` 槽位：
   
   ```bash
   su -c dd if=original.img of=/dev/block/by-name/boot_b
   ```
   
   **现在不要重启设备！**

## **Step 3**:
正常更新系统。如成功，转到 [步骤5](#update_while_keeping_root_step5) ，如失败，转到 [步骤4](#update_while_keeping_root_step4)。

## **Step 4**:
如果更新进度条没走完就提示 *当前已是最新版本* 并收到 *安装更新失败* 的通知，说明本方法不适合，用 `dd` 命令刷回你原来的镜像：<a id="update_while_keeping_root_step4"></a>
   
   - 如果当前在 `A` 槽位：
     
     ```bash
     su -c dd if=ksu.img of=/dev/block/by-name/boot_a
     ```
   
   - 如果当前在 `B` 槽位：
     
     ```bash
     su -c dd if=ksu.img of=/dev/block/by-name/boot_b
     ```

## **Step 5**:
在提示 *重启设备以完成更新* 时，回到终端模拟器 *依次键入* 下面的命令：<a id="update_while_keeping_root_step5"></a>
   
   - 如果当前在 `A` 槽位，重启后会处于 `B` 槽位：
   
   ```bash
   su
   blockdev --setrw /dev/block/by-name/boot_b
   dd if=/dev/block/by-name/boot_b of=/sdcard/next_version_boot.img
   dd if=ksu.img of=/dev/block/by-name/boot_b
   blockdev --setro /dev/block/by-name/boot_b
   ```
   
   - 如果当前在 `B` 槽位，重启后会处于 `A` 槽位：
   
   ```bash
   su
   blockdev --setrw /dev/block/by-name/boot_a
   dd if=/dev/block/by-name/boot_a of=/sdcard/next_version_boot.img
   dd if=ksu.img of=/dev/block/by-name/boot_a
   blockdev --setro /dev/block/by-name/boot_a
   ```

## **Step 6**:
重启设备，完成系统更新。现在应当仍旧拥有 Root 权限。
