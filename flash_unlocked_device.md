---
output: word_document
---

# 为您的联想小新 Pad Pro GT 解锁 Bootloader

![](/media/Unlock_Bootloader/header.jpg)

之前传出的高版本无法解锁 Bootloader ，到现在为止来看很可能是一个暂时的误传：以下“高版本”经过测试可以正常解锁 Bootloader ：1.5.04.414, 1.5.04.428, 1.5.04.445，但是不能排除后续版本封堵解锁的可能。

此外，众所周知的，[1.5.04.445 修复了免解锁漏洞](/faq.md#注释-3-关于免解锁刷机)，解锁刷机会是我认为比较正式的途径。

怎么恢复免解锁和是否有必要以保修为代价解锁、解锁之后[保修政策](https://www.lenovocare.com.cn/ServicePolicy.aspx)到底怎样、回锁情况如何等，这些都不是本文讨论的话题，本文讨论的是用邪修方法解锁 Bootloader 喵~

## 准备

1. 一台正常工作的 Windows 电脑，建议 Windows 11 ，并保证 USB 可靠
2. 一条正常**传输数据**的可靠的 USB 电缆
3. **保证头脑清醒和一定动手能力**

## 打开 USB 调试

在平板上完成这些基本准备步骤：

1. 打开设置，找到 **关于平板电脑**
2. 滑动右侧页面找到 **ZUXOS 版本**，狂点直到系统提示 **您已处于开发者模式**
3. 转到 **通用设置**
4. 滑动右侧页面最下方找到 **开发者选项**
5. 滑动右侧页面找到 **USB 调试**，打开这个选项。
6. USB 调试选项需要在稍后再允许调试，按照下图来选择：

![](/media/Unlock_Bootloader/allow_usb_debugging.webp)

## 打开 OEM 解锁

1. 在刚才一步的右侧界面中找到 **OEM 解锁**（在 USB 调试上面），打开这个开关
2. 另一个效果一样的方法是 9008 回读 `frp` 分区，将分区的最后一位从十六进制 00 改成 01 后重新用 9008 刷回设备

## 安装刷机驱动

从别的地方找驱动也行，不一定要用我的，但是不保证正常工作。

刷机驱动：[蓝奏云](https://wwapb.lanzout.com/it1WR3pkt04h) ，密码:gy8y

下载后双击打开有绿色 OPPO 标志的程序文件，一路下一步即可。最后不需要重启电脑。

## 安装 ADB 工具

这里可以用第三方工具箱替代，只是我个人更喜欢“原版”工具。。

1. 下载 adb 工具包（其实这玩意叫做 platform-tools）：[Android Developers](https://googledownloads.cn/android/repository/platform-tools-latest-windows.zip)
2. 解压 platform-tools-latest-windows.zip 得到 platform-tools 文件夹，先放到一个不容易记错的地方。
3. （进阶）如果你会设置环境变量，可以把 platform-tools 文件夹放到一个你认为合适的地方后将 platform-tools 的路径添加到 `Path` 中。
4. （标准）将 platform-tools 文件夹中的所有文件复制到系统文件夹（也就是 Windows 文件夹）下的 `System32` 和 `SysWOW64` 文件夹中，也就是路径形如 *C:\Windows\System32* 和 *C:\Windows\SysWOW64* 的文件夹中。

    ![](/media/Unlock_Bootloader/files_in_platform_tools_dir.webp)

    ![](/media/Unlock_Bootloader/system32_dir.webp)

    ![](/media/Unlock_Bootloader/syswow64_dir.webp)

5. 完成工作后重新打开一个终端界面，可以使用快捷键 `Win + R` 打开运行对话框然后输入 `cmd` ，也可以按快捷键 `Win + X` 然后按 `I` 打开终端模拟器。
6. 输入 `adb --version` ，这时应当能正常显示 adb 工具的版本和安装位置，你也可以用相同的方法测试一下 fastboot 能否正常被检测到，虽然检查 fastboot 没什么必要。
   ![](/media/Unlock_Bootloader/successfully_installed_adb.webp)
7. 别关命令行窗口，等会还有用。

## 申请解锁 Bootloader

登录联想解锁申请网站 [ZUI官网 - 解锁](https://www.zui.com/iunlock) ，在 **拯救者Y700 第五代 & 联想平板拯救者 Y900 13** 的入口提交解锁申请。要提交解锁申请，需要下面的信息：

1. 8位设备串号，或者叫做 GSN
2. Bootloader SN
3. 一个有效的邮箱，建议网易 163 邮箱，成功率最高
4. 一个尚有解锁次数剩余（理论上是一年三次）的联想账号

### 获取上述信息

1. 获取 GSN ，以下方法任选一种：
   - 从平板的包装盒标签获得
   - 从平板背面的标签获得
    ![](/media/Unlock_Bootloader/get_gsn_from_tablet_tag.jpg)
   - 从平板的设置中获得：设置 -> 关于平板电脑 -> 状态信息
    ![](/media/Unlock_Bootloader/get_gsn_from_settings_app.png)
   - 使用 adb shell 命令：`adb shell "getprop ro.odm.lenovo.devinfo.gsn"`
    ![](/media/Unlock_Bootloader/get_gsn_by_adb.png)
   - 从平板的 Bootloader 画面中获得： SERIAL NUMBER - 你的8位串号
    ![](/media/Unlock_Bootloader/get_gsn_from_bootloader.jpg)
2. 获取 Bootloader SN ，官网提供的方法不一定好用，按我这个来：
   - 重启到 Bootloader 模式：`adb reboot bootloader` 或者在关机状态按住电源键和音量上键
   - 依次输入下面两条命令，不要把减号也一起敲进去：
     ```powershell
     fastboot getvar Bootloader_SN_Part1
     fastboot getvar Bootloader_SN_Part2
     ```
     ![](/media/Unlock_Bootloader/get_bootloader_sn.png)
   - 把上面两条命令的结果拼接起来。例如第一条命令输出了 506D9326B25CAF7C7BB6E9844A9F2570 ，第二条输出了 8999FC067CED8136C71291A8E5CD6695 ，就应该把他们这样拼起来：*506D9326B25CAF7C7BB6E9844A9F25708999FC067CED8136C71291A8E5CD6695* ，总共 64 个英文字符，不确定的话可以复制进记事本或者 Word 检查下，如果不是这个数就拼错了。
3. 获得邮箱和联想账号（略）

### 申请解锁

1. 访问联想解锁申请网站 [ZUI官网 - 解锁](https://www.zui.com/iunlock) 。这里需要注意：移动端访问会被重定向到 m.zui.com/iunlock ，这个网址不包含最近更新的一些设备的解锁通道。移动端访问，需要先打开浏览器的电脑模式，然后手动把网址的 m.zui.com 改成 www.zui.com 。

![](/media/Unlock_Bootloader/visit_unlock_website_with_mobile.jpg)

2. 选择入口 **拯救者Y700 第五代 & 联想平板拯救者 Y900 13** 。
3. 先登录联想账号，不然都是白填。
4. 仔细填写信息：
   - 第一空，填写刚刚获取到的 GSN
   - 第二空，填写拼接完成的 Bootloader SN
   - 第三空，填写一个最好是网易 163 的邮箱，其他邮箱极大概率收不到解锁文件
   - 第四空，一个简单的验证码
   - 勾选“我已了解...”旁的复选框
    ![](/media/Unlock_Bootloader/fill_application_form.png)
5. 点击“提交申请”，会得到提交成功的提示信息。如果是 Pro GT 的申请入口，会提示不支持解锁云云。
    ![](/media/Unlock_Bootloader/successfully_submitted.png)

## 获取解锁授权文件 sn.img

一般来说申请解锁后的 10 分钟内解锁文件的获取邮件会发到你的邮箱。正确的解锁文件是一个大小只有 356 字节的小文件。

如果没有的话，要么是解锁申请因为邮箱的原因没收到，要么是根本没生成解锁文件（真的，没开玩笑，最好还是用 163 吧）。

如果邮箱中没有收到邮件，不管具体原因怎样，试一下用下面的邪修办法：

我们知道文件从网页链接 http://cdn.zui.lenovomm.com/developer/enhancedboot/<填入你的 bootloader_sn>/sn.img 获得，可以试试看填写 Bootloader SN 之后访问这个网址。

比如我们刚刚获取到了 64 长度的 Bootloader SN 是 506D9326B25CAF7C7BB6E9844A9F25708999FC067CED8136C71291A8E5CD6695 ，那就应该写：

http://cdn.zui.lenovomm.com/developer/enhancedboot/506D9326B25CAF7C7BB6E9844A9F25708999FC067CED8136C71291A8E5CD6695/sn.img

- 假如文件已经生成了，那么这个链接会自动触发浏览器的下载功能。
- 假如文件没有生成，会提示 404 。
- 假如你发现错误码是 403 ，等待时间实在太短（少于 1 分钟）或者填错网址了！

如果等了比较久的时间之后还是 404 ，建议换一个 163 邮箱重新申请。

## 正式解锁

将平板重启到 Bootloader 模式，可以用指令 `adb reboot bootloader` ，也可以在关机之后按住电源键和音量上键进入。

### 刷入解锁文件

命令原型：`fastboot flash unlock <sn.img>`

这里的尖括号要这样填写：

1. 先在命令行中敲 `fastboot flash unlock `，unlock 后面记得敲空格
2. 将你的 `sn.img` 用鼠标拖到命令行窗口中
3. 回车执行

如果一切正常，会有类似下面的输出：

```
PS C:\Users\USER> fastboot flash unlock F:\USER\TB710FU_critical\UBL_SN.img
Warning: skip copying unlock image avb footer (unlock partition size: 0, unlock image size: 356).
Sending 'unlock' (0 KB)                            OKAY [  0.001s]
Writing 'unlock'                                   OKAY [  0.000s]
Finished. Total time: 0.036s
```

没刷进去？检查你的 sn.img 大小是不是 356 字节吧！

### 发送解锁命令

命令原型：`fastboot oem unlock-go`

如果一切正常，会有类似下面的输出：

```
PS C:\Users\USER> fastboot oem unlock-go
OKAY [  0.033s]
Finished. Total time: 0.033s
```

故障排除：

```
PS C:\Users\USER> fastboot oem unlock-go
FAILED (remote: 'oem unlock fail, VERIFY')
fastboot: error: Command failed
```

刷入的 sn.img 文件无效！排查下面的原因：
1. 文件不是来自官方解锁申请网站，例如使用了 lenovobl.neko.ink 生成的文件
2. 文件生成有误，如果是早期通过人工审核分发 sn.img 的用户容易碰到这个问题。此外，注意检查你申请解锁时填写的表单是否有误
3. 忘记了刷解锁文件，或者解锁文件没刷进去喵~

```
PS C:\Users\USER> fastboot oem unlock-go
FAILED (remote: 'Device dose not allow unlock')
fastboot: error: Command failed
```

忘记打开 OEM 解锁了！启动到系统打开 OEM 解锁后重试！

```
PS C:\Users\USER> fastboot oem unlock-go
FAILED (remote: 'unknow command')
fastboot: error: Command failed
```

我去，联想终于封堵解锁了吗？何意味？

### 确认解锁

设备在上一步成功后会显示下面的画面：

![](/media/Unlock_Bootloader/triggered_unlock_flow.jpg)

现在尝试按音量键，会发现出现了蓝色的底色，用来指示目前某个选项正在被选中。将选项移动到 “UNLOCK THE BOOTLOADER” 后按电源键就可以解锁了。

如果不想解锁，将选项移动到“DO NOT UNLOCK THE BOOTLOADER” 后按电源键确认就可以终止解锁流程，正常启动操作系统。

## 如何锁定 Bootloader ？

参阅 [锁定 Bootloader](/lock_bootloader.md)