import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: "酷安Pad Pro GT 交流群 文档站",
  description: "--no_clever_tagline_needed",
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
      { text: "开始了解", link: "/before_we_start" },
      { text: "更新日志", link: "/updatelog" },
    ],

    sidebar: [
      {
        text: "教程本篇",
        collapsed: false,
        items: [
          { text: "术语表", link: "/glossary" },
          { text: "序言", link: "/before_we_start" },
          { text: "提问的智慧", link: "/how_to_ask" },
          { text: "刷机必修一", link: "/flash_unlocked_device" },
          { text: "刷机工具教程——高通工具箱", link: "/qcom_toolbox" },
          { text: "刷机工具教程——匣", link: "/geekflashtool" },
          { text: "重要警告 ⭐", link: "/important_warns"},
          { text: "刷机前必做 ⭐", link: "/before_flashing" },
          { text: "Root 方案比较和须知事项", link: "/comparison_and_warn" },
          { text: "Root 教程导航 ⭐", link: "/state_machine" },
          { text: "Root 相关教程",
            collapsed: false,
            items: [
              { text: "刷写 GKI Root ❌", link: "/flash_gki_root"},
              { text: "9008 刷写 LKM Root ⭐", link: "/flash_lkm_root_9008"},
              { text: "TWRP 刷写 LKM Root", link: "/flash_lkm_root_twrp"},
              { text: "移除 GKI Root", link: "/unroot_gki"},
              { text: "移除 LKM Root", link: "/unroot_lkm"},
            ]
          },
          { text: "刷入 TWRP", link: "/flash_twrp" },
          {
            text: "保留 用户数据 和 Root 权限进行系统增量更新",
            link: "/update_while_keeping_root",
          },
          {
            text: "刷入第三方 ROM、救砖包，和自己创建的备份",
            link: "/flash_3rd_party_rom",
          },
          { text: "常见问题速查 ⭐", link: "/faq" },
          { text: "附录1：第三方 ROM 信息汇总", link: "/appendix_3rd_party_roms" },
        ],
      },
      {
        text: "扩展篇",
        collapsed: false,
        items: [
          { text: "dd命令", link: "/dd_command" },
          { text: "制作通用 9008 包", link: "/make_generic_pc_firmware" },
          { text: "修复 GSN", link: "/fix_gsn" },
          { text: "AVB 机制入门", link: "/avb_guide" },
        ],
      },
    ],

    socialLinks: [
      { icon: "gitee", link: "https://gitee.com/WASDDestroy/tb710fu-doc" },
    ],

    footer: {
      message:
        '<a href="http://beian.miit.gov.cn" target="_blank">浙ICP备2025219672号-1</a>',
      copyright:
        "Copyright © 2025 - 至今， 酷安 @WASD_Destroy 和 酷安 @fhh730 ，采用 CC BY-SA 4.0 许可",
    },
  },
});
