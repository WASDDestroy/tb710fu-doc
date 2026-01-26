# TB710FU Doc

这是酷安Pad Pro GT 交流群的文档仓库！

本仓库主要用于群内有意向合作的成员进行版本控制。

## 现已完成 vitepress 化，要使用 vitepress 预览网页，遵循下面的步骤：

1. 安装 node.js

2. 安装 pnpm：
```shell
npm install -global pnpm
```

3. 创建一个目录并切换到它：
```shell
mkdir <your_dir>
cd <your_dir>
```

4. 安装 vitepress：
```shell
pnpm install -D vitepress
```

5. 初始化 vitepress：
```shell
pnpm vitepress init
```

6. 完成交互式初始化。

7. 将仓库中的文件复制到 vitepress 所在目录，如有冲突，选择覆盖。

8. 在终端启动 vitepress 开发服务器：
```shell
pnpm docs:dev
```

9. 访问终端中给出的地址即可预览页面。所有对文件的更改在保存后即刻生效，不需要重启服务器。

> [!note]
> 话虽如此，更改资源时还是有可能导致网页出错的。不过解决也简单，刷新就好。

10. 构建最终上传到服务器的产物：
```shell
pnpm docs:build
```

几秒钟后程序就能运行完成，在 `.vitepress` 目录下会多出一个 `dist` 文件夹，里面存放的内容就是可以直接上传到服务器的内容了。

> [!warning]
> 每次输出构建内容时记得提前清空或者删除 `dist` 文件夹！

## TODO

- [ ] 通用救砖包教程

- [ ] avbtool 教程 和 AVB2.0 解析

- [x] dd 教程

- [ ] 迁移 打开USB调试 安装9008驱动 安装ADB驱动 三部分内容

- [ ] rawprogram.xml解析

- [ ] 其他可读性优化和重排