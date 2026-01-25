import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "酷安Pad Pro GT 交流群 文档站",
  description: "--no_clever_tagline_needed",
  themeConfig: {
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
          { text: '刷写可解锁设备', link: '/flash_unlocked_device' },
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
        ]
      }
    ],

    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/WASDDestroy/tb710fu-doc' }
    ],

    footer: {
      copyright: 'Copyright © 2025-至今， Coolapk @WASD_Destroy 和 Coolapk @fhh730 ，采用 CC BY-SA 4.0 许可'
    }
    
  }
})
