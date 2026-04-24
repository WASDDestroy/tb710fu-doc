# 刷机必修一

> [!tip]
> 如果你之前没玩过机，看看这里也是极好的。
>
> 本篇的适用范围并不限制在 小新 Pad Pro GT。

> [!warning]
> 部分文字明确标注了仅适用于/不适用于某个厂家出品的设备或者某个特定产品。
>
> 针对本文**不适用**的操作（例如小米设备解锁 BootLoader）请自行查阅其他资料。

> [!warning]
> 所有以尖括号 `<>` 包裹起来的文字仅作为示范。
>
> 在你实际使用时，应当将**包含尖括号在内的所有文本** 替换成你实际使用的镜像。
>
> 例如：
>
> *教程中*写的是 `fastboot flash unlock <your_sn.img>`
>
> 而*你的* `sn.img` 存放在 `D盘根目录` ，也就是说你需要输入的命令是`fastboot flash unlock D:\sn.img`
>
> 如果不太确定这些命令中含有尖括号的部分应该怎么写，请参阅下面的网址：
>
> [《你缺失的那门计算机课》 - 文件与文件管理](https://www.criwits.top/missing/file-and-file-management.html)
>
> [《你缺失的那门计算机课》 - 一些约定与预备知识](https://www.criwits.top/missing/first-things-first.html)
>
> 以及[此书](https://www.criwits.top/missing/)其他的基础篇内容。
>
> 我发誓不是在给他们打广告。

## Step 0: 准备必要环境

以联想设备为例。

### <a id="USB_Debugging"></a>打开 USB 调试：

1. 打开设置；

2. 找到 `关于平板电脑`；

3. 连续点击右侧页面中的`软件版本`直到系统提示`您已处于开发者模式`；

4. 转到`通用设置`，滑动找到`开发者选项`；

5. 在`开发者选项`中找到并打开`USB 调试`开关；

> [!important]
> 联想设备可能需要将 USB 模式设置为 `仅充电` （或者叫做 `不用于数据传输` ）才能正常使用 USB 调试。

6. 弹出的`是否允许 USB 调试`对话框请选择确认。

> [!note]
> 对于其他设备，如果找不到“软件版本”字样，可能需要寻找诸如 `版本号` 、 `OS版本` 等字样并连续点击。

### <a id="Install_ADB"></a>安装 ADB 工具：

1. 在群文件夹 `搞机工具` 或者 [Android Developers](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn) 下载`platform-tools-latest-windows.zip`，这就是 ADB工具包 。

2. ADB 工具解压后应当得到`platform-tools`文件夹，打开能看到以下文件：

![](./media/image13.webp)

全选这些文件并复制，将它们粘贴到`Windows`文件夹下的`System32`**和**`SysWOW64`文件夹中，例如：Windows 安装在 C 盘，则应当复制到以下图片中所示的目录：

![](./media/image14.webp)

![](./media/image15.webp)

现在 ADB 工具应当已经完成安装，要测试是否正确安装，按`Win + X`或者直接用鼠标右键任务栏上的 `Windows 徽标` 打开超级菜单，然后选择`Windows Powershell`或者`命令提示符`或者`终端`，打开后输入以下命令：

```
adb --version
```

应当得到类似以下的输出：

![](./media/image16.webp)

这说明 ADB 工具已经正确安装。

### <a id="Install_Driver"></a>安装9008驱动：

对于可以解锁的设备来说这一步不强制。

- 方法1：下载群内**搞机工具**文件夹中的 `9008驱动_来自刷机匣.exe`，双击打开安装。

- 方法2：下载群内**搞机工具**文件夹中的工具“匣”，打开软件主界面后安装9008刷机驱动。

## Step 1: 申请解锁

> [!warning]
> 不建议尝试强行解锁 BootLoader 的行为。

对于**联想**的可解锁设备：

0. **备份所有用户数据**

1. 访问[联想 BootLoader 解锁申请网站](https://www.zui.com/iunlock)，填写所需信息并提交申请。

2. 在提供的邮箱中接收发送来的 `sn.img` 。

3. 电脑安装 `ADB` 工具，将设备重启到 `BootLoader` 模式。如果有USB调试，可以使用下面的命令:

   ```shell
   adb reboot bootloader
   ```

4. 输入下面的命令刷入 `sn.img` 并启动解锁流程：

   ```shell
   fastboot flash unlock <your_sn.img>
   fastboot oem unlock-go
   ```

5. 在平板端确认解锁，**确认解锁后所有用户数据会被清除**，并自动重启到系统。

> [!warning]
> 如果有 9008 使用能力（对于 MTK 机型则是 BootROM 深刷），到这一步就可以开始备份 `底层数据` 了！推荐刷机匣。

## Step 2: 刷写 Root

0. 比较几种 Root 实现：
   
   | \    | Magisk                                                         | KernelSU                                                                                              | KernelSU Next                                                                                   | SukiSU Ultra                                                                                                                |
   |------|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
   | 优势 | - 兼容性好<br>- 内置 Zygisk 实现<br>- 弹窗申请 `su` ，操作直观 | -  `元模块` 提供强大的挂载能力<br>- 稳定性和安全性最佳<br>- 极好的隐藏性<br>- 允许控制用户 UID 和 GID | -  `元模块` 提供强大的挂载能力<br>- 极好的隐藏性<br>- 个性化管理器<br>- 允许控制用户 UID 和 GID | -  `元模块` 提供强大的挂载能力<br>- 极好的隐藏性<br>- 内置 SusFS 和 KPM 支持<br>- 个性化管理器<br>- 允许控制用户 UID 和 GID |
   | 劣势 | - 需要在系统内完成修补，免解锁刷入更复杂。                     | - Root 授权不如 Magisk 直观<br>- 稀疏文件影响存储空间统计                                             | - Root 授权不如 Magisk 直观<br>- 稀疏文件影响存储空间统计                                       | - bug 较多<br>- Root 授权不如 Magisk 直观<br>- 稀疏文件影响存储空间统计                                                     |

   *注：现在更推荐使用 KernelSU 的 LKM 模式来获取 Root，这个模式下也需要在 Android 系统中修补镜像*

1. 确定可用的 Root 实现：
   - 5.10 以下内核版本的设备：首选 `Magisk` 。
   - 5.10 及以上内核版本的设备：`Magisk`, `KernelSU` 和 `APatch` 任君选择。
2.  得到 `init_boot` 或 `boot` 镜像 ，通过救砖包或者 `Payload Dumper` 实现
   > [!tip] 如何确定应该使用 `init_boot` 还是 `boot` ?
   >
   > 从出厂搭载 Android 13 的设备（内核版本 5.15）开始，原先位于 `boot` 的 `ramdisk` 部分被移动到了 `init_boot` 分区，这是 `Magisk` 和 `KernelSU LKM 模式` 修补的分区。
   >
   > 先根据管理器区分：
   >
   > APatch: `boot`
   >
   > Magisk: 
   >  - 出厂 Android 版本小于等于 `Android 12` ，或者内核版本前两位小于等于 `5.10`: `boot`；
   >  - 出厂为 `Android 13` 及以上，或者内核版本前两位大于等于 `5.15`: `init_boot`。
   >
   > KernelSU:
   > - GKI 模式（目前已不推荐）：`boot`
   > - LKM 模式：
   >     - 出厂 Android 版本小于等于 `Android 12` ，或者内核版本前两位小于等于 `5.10`: `boot`；
   >     - 出厂为 `Android 13` 及以上，或者内核版本前两位大于等于 `5.15`: `init_boot`。

3.  选择 Root 实现并安装：

    ### 方法 1: Magisk / Alpha / Kitsune Mask
    - 下载并安装管理器：
      - 原版 Magisk: [GitHub Releases](https://github.com/topjohnwu/Magisk/releases)

      - Alpha / Kitsune Mask: 暂无

    - 将 `init_boot.img` 交给 `Magisk` 管理器刷写，将修补得到的产物（一般在 Download 目录中）复制到电脑上

    - 平板重启到 `BootLoader` ，输入下面的命令：

      ```shell
      fastboot flash init_boot <your_init_boot.img>
      fastboot reboot
      ```

    - 开机就能看到管理器提示正常工作了。

    ### 方法 2: KernelSU / KernelSU Next / SukiSU Ultra
    - 下载并安装管理器：
      - 原版 KernelSU: [GitHub Releases](https://github.com/tiann/KernelSU/releases)

      - KernelSU Next: [GitHub Releases](https://github.com/KernelSU-Next/KernelSU-Next/releases)

      - SukiSU Ultra: [GitHub Releases](https://github.com/SukiSU-Ultra/SukiSU-Ultra/releases)

      > [!tip]
      > 想使用 `KernelSU 3.0.0` 或者更新版本**对应的分支**？
      >
      > 不建议，原版 KernelSU 更稳定，可以通过 `元模块` 实现分支版本的功能。

    - 根据你想使用的模式进行操作：
      - LKM: 将 `init_boot.img` 交给管理器修补，将修补后的文件复制到电脑上，然后将平板重启到 `BootLoader` 执行下面的命令：

        ```shell
        fastboot flash init_boot <your_init_boot.img>
        fastboot reboot
        ```

      - GKI: 下载适合你设备的 `boot.img`，然后将平板重启到 `BootLoader` 执行下面的命令：

        ```shell
        fastboot flash boot <your_boot.img>
        fastboot reboot
        ```

      > [!tip]
      >
      > 怎样找到适合你设备的 `boot` 镜像？
      >
      > 去各大实现的 `文档站` 查找：
      >
      > [KernelSU](https://kernelsu.org/zh_CN/guide/installation.html)
      >
      > [SukiSU Ultra](https://sukisu.org/zh/guide/installation)
      >
      > KernelSU Next? 对不起，我找不到。

    - 开机就能看到管理器提示正常工作了。

    ### 方法 3: APatch

    - 下载并安装 APatch 管理器: [GitHub Releases](https://github.com/bmax121/APatch/releases)
    - 


> [!warning]
> 就算没有深度刷机能力，到这一步你也可以备份用户数据了！详情参考[dd命令 - 从入门到精通](./dd_command.md)

## Step 3: 玩机：基础必备模块

> [!note] 什么是模块？
>
> 模块是一个压缩包，可以被 `Magisk` 、 `KernelSU` 等管理器安装，并提供对系统的修改。

> [!note] 为什么使用模块？
>
> 与上古时期用户在 Root 后手动修改系统文件相比，模块提供了以下优点：
>
> 1. 统一管理，便于维护：用户不需要记忆每个修改的文件，管理器会记录所有安装的模块，如果需要停用更改，管理器会帮你完成一切，而不需要手动到每个目录替换文件。
> 2. 挂载修改，破坏性小：利用 `OverlayFS` 或者 `Magic OverlayFS` ，由模块提供的修改文件被覆盖到原始系统文件“上方”。
>    - 可以这样理解：原始系统是一张写有内容的稿纸。
>    - 不使用模块进行修改，那么就需要用铅笔直接在原始内容上进一步勾画；如果要停用更改，就要小心翼翼地用橡皮擦掉，且有时还会出现意外事故，比如把纸擦破了（永久破坏硬件）或者擦到了其他原始内容（破坏了系统文件）。
>    - 使用模块进行修改，相当于在纸上添加了一块玻璃板，所有更改通过马克笔等形式在玻璃板上完成。虽然原稿会因为存在一块玻璃呈现些许不清晰（部分文件无法通过模块修改），但是如果需要移除更改，只需要挪走玻璃板。纸上的二维生命不会察觉到多数更改（如果他们能感觉光照强度，可能会觉得太阳变暗了 -> 指某些较为先进的环境检测软件）
> 3. 整合文件，便于分发：所有的更改被整合到一个 `zip` 文件中，不需要用户处理复杂的文件路径和权限。压缩后的文件体积更小，更适合网络分发。

> [!danger] 模块的坏处？
>
> 1. 细节被隐藏，不利后续维护：用户无法在出现问题后精确定位“更改哪个文件导致问题发生”，只能知道“刷了这个模块后问题出现了”。
> 2. 模块间作用顺序不明确：可能出现“模块打架”（多个模块修改同一个文件，造成文件相关的行为不确定）
> 3. 用户门槛降低，破坏用户设备变得更容易：用户只需要下载并刷入模块，潜在的消去了“下载并知道我所更改的每一个文件”的步骤，导致恶意代码容易藏身于模块中。且模块痕迹基本不残留在更改的文件中，导致作恶后难以追踪“幕后凶手”。[案例 - zygisk.apk 事件](https://www.coolapk.com/feed/67763977?s=MDEzNGI4OWYxMWM1ODUzZzY5Nzc2M2Rhega1590)

> [!tip] 我们应该怎么做？
>
> 1. 永远只从官方发布源下载模块，例如下载 Zygisk Next 应当访问他们的 GitHub Releases 页面（也就是[这里](https://github.com/Dr-TSNG/ZygiskNext/releases)）
> 2. 不能确定模块的用途、适用环境和用法则不要刷入；
> 3. 大道至简，少刷玄学模块，减少模块数量。

1. **小新 Pro GT 用户可以不看这条 ->** 如果 Magisk 版本低：神仙自动救砖 / 音量键自动救砖

2. Zygisk Next: 一切需要 Zygisk 框架的模块的基石

3. LSPosed: 基于 Zygisk 的现代 XPosed 实现， **需要 Zygisk 模块，例如 Zygisk Next!!!**

> [!tip]
> Zygisk Next 自 1.3.0 版本起整合了 Shamiko 的绝大多数功能，对隐藏 Root 痕迹有所帮助。

## Step 4: 玩机：Root 授权

1. Magisk 及其分支会在用户开启需要 Root 权限的 APP 时弹出申请 Root 权限的提示框。这和更早期的 SuperSU ~~以及 KingRoot 等方案~~ 一致。

2. KernelSU 及其分支**需要用户在 APP 中设置 Root 权限列表**。
   - 如果要为新安装的 APP 申请 Root 权限，最好重启管理器。

   - 如果为正在运行的 APP 授予 Root 权限，可能需要重启应用才能生效。

   - KernelSU 及其分支还允许通过 APP Profile 精细控制应用的权限等级，详情参考[KernelSU - APP Profile](https://kernelsu.org/zh_CN/guide/app-profile.html)。

## Step 5: 出问题了怎么办？

0. **保命技**：强制重启， `电源键 + 音量下键` （仅在小新 Pad Pro GT 上测试过）

> [!tip]
> 事实上，如果你不确定强制重启的快捷键，可以直接按住 `电源键 + 音量上键 + 音量下键` 不放，直到屏幕熄灭。
>
> 不过这么做有可能让你进入深度刷机模式。在深度刷机模式下屏幕也不会亮起，且需要特定的按键组合才能退出。因此不要盲目按住全部按键。

1. 刷完模块不开机：
   - KernelSU 系列用户：按3次音量下进入 KernelSU 提供的安全模式，进入系统后关闭刚刚刷入的问题模块

   - 较新的 Magisk 管理器用户和 APatch 用户：查找安全模式的按键组合并使用按键组合进入安全模式

   - 有救砖模块：等待救砖模块作用；如果是音量键救砖，按模块说明方法操作进行救砖。

2. 刷完系统不开机：
   - 尝试回滚更改：刷入之前备份的底层或者没问题的刷机包。

   - 还是不行？抱歉，需要具体情况具体分析。

3. 执行脚本后不开机：
   - 重新刷写稳定系统镜像。

   - 被*格机*了？抱歉，有可能需要编程器或者授权刷机。如果可以的话尝试寻找售后协助。

4. 怀疑中 Root 相关的病毒了？
   - 卸载 Root ，刷回版本正确的原厂镜像而非只卸载管理器。

   - 最好重新**全新刷机**，连用户数据都不一定能留了。

## Step 6: 一些基本界面

可以使用 `音量键` 浏览 `BootLoader` / `Recovery` / `Fastbootd` 下提供的选项，按电源键确认选项。

配图不是实拍，它们基于实拍图制作并添加了中文翻译。实际使用时， `Recovery` 和 `FastbootD` 中被选中的选项会被使用 `蓝底白字` 进行*高亮*。

1. BootLoader (Fastboot)

![](./media/image3.webp)

2. FastbootD

![](./media/image4.webp)

3. Recovery (AOSP版本)

![](./media/image5.webp)

日志内容会出现在 `Recovery 界面的左下角`。

有时候会看到下面的界面，这代表着 `/data` 分区出现了问题，只能格式化（恢复出厂）了。

![](./media/image6.webp)

## 还有什么需要知道的吗？

1. 解锁是为了刷写未经认证的镜像。

2. 获取 Root 的过程就是刷入一个经过第三方修改，可以和操作系统内应用程序交互的镜像。

3. 解锁 BootLoader 或者想办法获得官方的签名，都能让修改过的镜像在设备上工作。
