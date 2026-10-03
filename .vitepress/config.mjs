import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: "WASDDestroy 的个人文档站",
  description: "--no_clever_tagline_needed",
  ignoreDeadLinks: false,

  head: [
    [
      "meta",
      {
        name: "copyright",
        content: "CC BY-NC-SA 4.0",
      },
    ],
    [
      "meta",
      {
        property: "og:license",
        content: "CC BY-NC-SA 4.0",
      },
    ],
    [
      "link",
      {
        rel: "license",
        href: "/legal/CC-BY-NC-SA-4.0.txt",
      },
    ],
  ],

  themeConfig: {
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            // 如果你想翻译默认语言，请将此处设为 `root`
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "重置搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "输入",
                  navigateText: "导航",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
      },
    },
    siteTitle: "TB710FU Doc",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "通用教程", link: "/generic/before_we_start" },
      { text: "更新日志", link: "/generic/updatelog" },
      { text: "资源下载", link: "/generic/resource_download"},
      { text: "问题反馈与技术交流", link: "/generic/feedback" },
    ],
    editLink: {
      pattern: 'https://gitee.com/WASDDestroy/tb710fu-doc/blob/master/:path'
    },

    sidebar: {
      '/': [
        {
          text: "通用教程",
          collapsed: false,
          items: [
            { text: "序言", link: "/generic/before_we_start" },
            { text: "设备参数", link: "/generic/specs"},
            { text: "解锁 Bootloader", link: "/generic/flash_unlocked_device" },
            { text: "锁定 Bootloader", link: "/generic/lock_bootloader" },
            { text: "全量备份 (必做) ⭐", link: "/generic/before_flashing" },
            { text: "刷 Root (Ramdisk)", link: "/generic/root_your_device_lkm" },
            { text: "救砖", link: "/generic/unbrick_device" },
            {
              text: "保留用户数据和 Root 权限进行系统增量更新",
              link: "/generic/update_while_keeping_root",
            },
            {
              text: "刷入第三方 ROM (兰微卡鱼版)",
              link: "/generic/flash_yu_s_third_party_rom"
            },
            {
              text: "刷入兰微卡鱼 ColorOS 专用修复模块",
              link: "/generic/flash_fix_module_yu_c16"
            }
          ],
        },
        {
          text: "附录",
          collapsed: false,
          items: [
            { text: "常见问题速查", link: "/generic/faq" },
            { text: "资源下载", link: "/generic/resource_download" },
            { text: "问题反馈与技术交流", link: "/generic/feedback" },
          ],
        },
        {
          text: "扩展篇",
          collapsed: true,
          items: [
            { text: "修复 GSN", link: "/generic/fix_gsn" },
            { text: "联想官方 9008 刷机包说明", link: "/generic/notes_on_official_edl_roms" },
          ],
        },
        {
          text: "免解锁刷机",
          collapsed: true,
          items: [
            { text: "开始免解锁刷机之前", link: "/without_unlock/before_we_start"},
            { text: "免解锁基础知识", link: "/without_unlock/dangerous_things"},
            { text: "重要警告 ⭐", link: "/without_unlock/important_warns" },
            { text: "高版本用户必读",
              collapsed: false,
              items: [
                { text: "现状概述", link: "/without_unlock/high_versions/overview" },
                { text: "使用 Android 设备恢复高版本系统为 AOSP 信任链", link: "/without_unlock/high_versions/restore_trust_chain_on_android"},
                { text: "在 Android 上创建签名配置", link: "/without_unlock/high_versions/create_profile_avbdroid"},
              ],
            },
            { text: "Root 方案比较和须知事项", link: "/without_unlock/comparison_and_warn" },
            { text: "Root 教程导航 ⭐", link: "/without_unlock/state_machine" },
            {
              text: "Root 相关教程（1.5.04.445 以下）",
              collapsed: false,
              items: [
                { text: "刷写 GKI Root ❌", link: "/without_unlock/flash_gki_root" },
                { text: "9008 刷写 LKM Root ⭐", link: "/without_unlock/flash_lkm_root_9008" },
                { text: "TWRP 刷写 LKM Root", link: "/without_unlock/flash_lkm_root_twrp" },
                { text: "移除 GKI Root", link: "/without_unlock/unroot_gki" },
                { text: "移除 LKM Root", link: "/without_unlock/unroot_lkm" },
              ],
            },
            { text: "刷入 TWRP", link: "/without_unlock/flash_twrp" },
            {
              text: "保留 用户数据 和 Root 权限进行系统增量更新",
              link: "/without_unlock/update_while_keeping_root",
            },
            {
              text: "刷入第三方 ROM 和自己创建的备份",
              link: "/without_unlock/flash_3rd_party_rom",
            },
            { text: "移除 Root", link: "/without_unlock/unroot" },
            { text: "附录：第三方ROM相关", link: "/without_unlock/appendix_3rd_party_roms" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "gitee", link: "https://gitee.com/WASDDestroy/tb710fu-doc" },
    ],

    footer: {
      message:
        '<a href="http://beian.miit.gov.cn" target="_blank">浙ICP备2025219672号-1</a>',
      copyright:
        'Copyright © 2025 - 至今， 酷安 @WASD_Destroy, 采用 <a href="/legal/CC-BY-NC-SA-4.0.txt" target="_blank">CC BY-NC-SA 4.0</a> 许可',
    },
  },
  lang: "zh-CN",
  locales: {
    "/": {
      label: 'Simplified Chinese',
      lang: 'zh-CN'
    },
  }
});
