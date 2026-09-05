# TB710FU Doc

> [!warning]
> 因现在本项目作为子模块使用，它引用了一些处于上级目录中的资源，不再能被单独构建。
>
> 请访问仓库 [我的文档总站](https://gitee.com/WASDDestroy/wasddestroy-docs) 进行构建。

## 预览、编辑和部署
要使用 vitepress 预览网页，遵循下面的步骤：

1. 安装 node.js

2. 安装 pnpm：
```shell
npm install -g pnpm
```

1. 克隆仓库并切换到它：
```shell
git clone https://gitee.com/WASDDestroy/tb710fu-doc.git
cd tb710fu-doc
```

1. 安装 vitepress：
```shell
pnpm install -D vitepress
```

1. 将仓库中的文件复制到 vitepress 所在目录，如有冲突，选择覆盖。

2. 在终端启动 vitepress 开发服务器：
```shell
pnpm docs:dev
```

1. 访问终端中给出的地址即可预览页面。直接打开目录下的 Markdown 文件就可以编辑。所有对文件的更改在保存后即刻生效，不需要重启服务器。

> [!note]
> 话虽如此，更改资源时还是有可能导致网页*暂时*出错的。不过解决也简单，*刷新*就好。

10. 构建最终上传到服务器的产物：
```shell
pnpm docs:build
```

几秒钟后程序就能运行完成，在 `.vitepress` 目录下会多出一个 `dist` 文件夹，里面存放的内容就是可以直接上传到服务器的内容了。

> [!warning]
> 每次输出构建内容时记得提前清空或者删除 `dist` 文件夹！

## TODO

- [x] 通用救砖包教程
- [ ] rawprogram.xml解析
- [x] avbtool 教程 和 AVB2.0 解析
- [x] dd 教程
- [x] 迁移 打开USB调试 安装9008驱动 安装ADB驱动 三部分内容
- [ ] 防回滚情况概述
- [ ] avbtool 签名 vbmeta_system 进行降级
- [ ] 其他可读性优化和重排