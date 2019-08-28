// pages/project/project.js
const app = getApp();
Page({  
	goProject(){
		wx.switchTab({
		  url: '/pages/dt/dt'
		})
	},
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
      path: '/pages/index/index?id=' + that.data.scratchId,
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }, 
});