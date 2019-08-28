const app = getApp();
var that2=this

Page({

  data: {
    school: '',
    institute: '',
    grad: '',
    number: '',
    name: '',
  },
  submit:function(e){
    //var that=this
   this.setData({
     
   })
   
   
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
      path: '/pages/xingxi/xingxi?id=' + that.data.scratchId,
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})