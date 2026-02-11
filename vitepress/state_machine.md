# Root 导航

看完[上一篇文章](./comparison_and_warn.md)后你应当确定了自己希望采用怎样的方案，现在可以按照下面的提示查找对应教程了。

> [!info]
> 可以将 GKI Root 、 LKM Root 和 无 Root 三个状态用下面的状态图展示：
>
> GKI Root <-> 无 Root <-> LKM Root
>
>    ^                        ^
>
>    |                        |
>
>    --------------------------


具体的操作请参考下面的指引进行跳转：

<a id="GKI_Root_Steps"></a>
1. 无 Root 到 GKI Root：[点击跳转 - 刷写 GKI Root](./flash_gki_root.md)

<a id="LKM_Root_Steps"></a>
2. 无 Root 到 LKM Root：有两种解决方案。

    - 使用 9008 刷写镜像：[点击跳转 - 使用 9008 刷写 LKM Root](./flash_lkm_root_9008.md)

    - 先刷入 TWRP ，然后使用TWRP一键安装 KernelSU LKM：

        第一步：[点击跳转 - 刷写 TWRP](./flash_twrp.md)

        第二步：[点击跳转 - 使用 TWRP 一键安装 KernelSU LKM](./flash_lkm_root_twrp.md)

    > [!note]
    > 两种解决方案是等效的。

<a id="GKI_To_LKM"></a>
3. GKI Root 到 LKM Root：

    第一步：[点击跳转 - 解除 Root ：GKI Version](./unroot_gki.md)

    第二步：[点击跳转 - LKM Root](#LKM_Root_Steps)

4. LKM Root 到 GKI Root：

    第一步：[点击跳转 - 解除 Root ：LKM Version](./unroot_lkm.md)

    第二步：[点击跳转 - GKI Root](#GKI_Root_Steps)

5. GKI Root 到 无 Root：[点击跳转 - 解除 Root ：GKI Version](./unroot_gki.md)

6. LKM Root 到 无 Root：[点击跳转 - 解除 Root ：LKM Version](./unroot_lkm.md)
