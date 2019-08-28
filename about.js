Page({
  data: {
    projectAddress: 'https://github.com/myvin/juejin',
    github: 'https://github.com/myvin',
    email: '邮箱号',
    qq: 'qq号',
    wechat:'微信号'
  },
  copy(e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success() {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})