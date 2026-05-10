# 小米 8750、8550 解锁 Bootloader 手敲命令科普

> [!danger]
> 使用未经安全验证的镜像操作设备可能为设备植入后门，造成严重的信息安全风险！
>
> 请确定你清楚你正在了解什么操作，清楚这个操作可能带来的后果（包括但不限于设备变砖）！

> [!warning]
> 实践是检验真理的唯一标准。
>
> 部分设备的部分高版本安全补丁的系统也能够注入宽容 `cmdline` 。所以请自行尝试宽容命令，看看能不能正确执行并得到宽容的 SELinux 。

## 如果能够注入 cmdline （一般来说安全补丁低于 2026年2月）

0. 原料准备：工厂 ROM、8750解锁镜像、修改好的分区表
1. 提权，进入 `Bootloader` 模式输入下面的命令：
    ``` Powershell
    fastboot oem set-gpu-preemption 0 androidboot.selinux=permissive
    fastboot continue
    ```
    > [!important] 成功了吗？
    > 如果执行第一条命令之后 `fastboot` 工具返回 `[OKAY]` ，说明提权基本成功了。
    >
    > 开机之后应当执行这个命令： `adb shell getenforce` 来确定当前是否真正处于 `permissive` 模式。
2. MQSAS 服务提权用 dd 刷 abl 分区，或者 KernelSU 越狱之后用任意需要 Root 的分区刷写工具刷 abl 分区（当然也可以 `su -c dd if=... of=...`），这里的 abl 是工厂 ROM 中的工程 abl 。关于 dd 命令请参考本教程的其他部分。
3. adb reboot bootloader
4. 双击 `flash_all.bat` 刷入准备好的工厂 ROM
5. ROM 会自动重启到 FastbootD 以清空防回滚计数，重启到 FastbootD 后即可重新进入 Bootloader 。
6. 进入 Bootloader 后，如果需要降级可以直接刷入正常线刷包。对于本篇教程我们讨论解锁流程：
   - 刷入修改的 GPT： `fastboot flash partition:4 gpt_both_4_modified.bin`
   - 启动精心打造的 UEFI 负载： `fastboot boot sm8750_ubl.img`
   - 屏幕花屏后等待 5 秒钟，按电源和音量下重启设备到 Bootloader 模式
   > [!tip] 关于 fastboot boot
   > 这条命令不会修改设备 ROM 中装载的镜像，它原本是用于临时向内存中加载一个可被引导的镜像做临时启动测试的。
   - 输入命令检测解锁状态： `fastboot getvar unlocked` ，如果输出 `yes` ，恭喜你，解锁成功。
7. 恢复原版分区表
   - 最简单的做法是恢复正常 GPT ： `fastboot flash partition:4 gpt_both_4_original.bin`
   - 也可以用 `flash_all.bat` 刷工厂包，工厂包的刷机脚本包含恢复分区表的操作。
   > [!danger] 不要错选成 flash_all_and_lock.bat!
   > 前功尽弃！

## 如果不能注入 cmdline

> [!danger]
> 下面的内容不适合 ROM 生产商为铠侠（KIOXIA）的设备。

我们注入 `cmdline` 是为了做什么？显然，是为了刷入工程 `abl` 。也就是说，通过任意方法写入 `abl` 分区为工程 abl 即可。完成这个步骤之后就可以按照能够注入 cmdline 的情况的第4点继续操作了。

为了完成这一步，我们需要额外的原料 `8750_noauth_firehose.melf` 。使用此文件按照本站其他 9008 教程刷入 abl 分区，然后关机，按电源和音量下启动到 `Bootloader` ，即可继续操作。

> [!important] 不要直接在 9008 模式刷写工程包！
> 如果你的工程包碰巧是 eraseNV （清除基带信息） 的版本，那么恭喜你，9008 刷入之后你的基带信息将几乎无法恢复！
>
> 就算基带信息得以保全，9008模式直接刷写工程包也可能不开机，因此不要这么做。