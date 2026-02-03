import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "酷安Pad Pro GT 交流群 文档站",
  description: "--no_clever_tagline_needed",
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: { // 如果你想翻译默认语言，请将此处设为 `root`
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },
    siteTitle: 'TB710FU Doc',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '开始了解', link: '/before_we_start' }
    ],

    sidebar: [
      {
        text: '快速访问',
        items: [
          { text: '序言', link: '/before_we_start' },
          { text: '提问的智慧', link: '/how_to_ask' },
          { text: '可解锁设备怎样玩机', link: '/flash_unlocked_device' },
          { text: '前置知识和术语', link: '/glossary' },
          { text: '刷机工具教程——高通工具箱', link: '/qcom_toolbox' },
          { text: '刷机工具教程——匣', link: '/geekflashtool' },
          { text: '刷机前必做', link: '/before_flashing' },
          { text: 'Root 方案比较和须知事项', link: '/comparison_and_warn' },
          { text: '刷写 GKI Root', link: '/flash_gki_root' },
          { text: '使用 9008 刷写 LKM Root', link: '/flash_lkm_root_9008' },
          { text: '刷入 TWRP', link: '/flash_twrp' },
          { text: '使用 TWRP 刷入 KernelSU LKM', link: '/flash_lkm_root_twrp' },
          { text: '解除 Root', link: '/unroot' },
          { text: '保留 Root 权限进行系统更新', link: '/update_while_keeping_root' },
          { text: '刷入第三方 ROM、救砖包，和自己创建的备份', link: '/flash_3rd_party_rom' },
          { text: '常见问题速查', link: '/faq' },
          { text: '扩展: dd命令', link: '/dd_command' },
          { text: '制作通用 9008 包', link: '/make_generic_pc_firmware'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/WASDDestroy/tb710fu-doc' }
    ],

    footer: {
      message: '<a href="http://beian.miit.gov.cn" target="_blank">浙ICP备2025219672号-1</a>',
      copyright: 'Copyright © 2025 - 至今， 酷安 @WASD_Destroy 和 酷安 @fhh730 ，采用 CC BY-SA 4.0 许可'
    }
    
  }
})
