var amapFile = require('../../libs/amap-wx.js');
//var config = require('../../libs/config.js');

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    buildingname: {},
    xuanz: true,
  },

  onLoad: function () {
    console.log('onLoad');
    this.getLocation();
  },
  dianji: function (e) {
    var that = this
    that.setData({
      xuanz: false
    })
   
  },

  zanting: function () {
    var that = this
    that.setData({
      xuanz: true
    })
    
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
      path: '/pages/dt/dt?id=' + that.data.scratchId,
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  getLocation: function () {/* 获取定位地理位置 */
    type: 'gcj02';
    var that = this;
    
    var myAmapFun = new amapFile.AMapWX({ key:'d4c21e5103fc34b2209ab1946425c764'});//新建一个amapFile对象

    myAmapFun.getRegeo({
      success: function (data) {
        console.log('getLocation success');
        that.setData({
          buildingname: data[0].regeocodeData.regeocodes.addressComponent.building.name
        });
      },
      iconPath: "../../img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        //返回数据内，已经包含经纬度
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            buildingname: data[0].regeocodeData.formatted_address
          }

        })
        console.log(data[0]);
        console.log("地址" + data[0].regeocodeData.formatted_address)
      },

      fail: function (info) {
        // wx.showModal({title:info.errMsg})
        console.log("getLocation fail");
        wx.showModal({ title: inof.errMsg });
        that.setData({
          result: '获取位置失败！'
        });
      }
    })
  }
  ,
  toast: function (e) {
    wx.navigateTo({
      url: '/pages/tu/tu',
    })
  },
  toast1: function (e) {
    wx.navigateTo({
      url: '/pages/gj/gj',
    })
  }
})
