// pages/addCourse/addCourse.js
import service from '../../utils/service'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: '',
    time: '',
    place:'', 
    classstime: ["8：00", "10：00", "14：00","16:20"],
    classstimeIndex: 0,  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

addTask:function(){
  var mythis=this
  console.log(mythis.data.course)
  app.globalData.currentCourse.push({ id: 0, type: 1, day: 0, start: 1, sections: 2, course: "语文", teacher: "王老师", place: "至善楼" });
//  console.log(app.globalData.currentCourse);
  wx.navigateTo({
    url: '../schedule/schedule',
  })
},
changeCourse(e) {
  var mythis = this
  mythis.setData({
    course: e.detail.value
  })
//  console.log(22222)
  //console.log(mythis.course)
},
changeTime(e) {
   this.setData({
     time: e.detail.value
   })
},

changePlace(e) {
   this.setData({
    place: e.detail.value
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})