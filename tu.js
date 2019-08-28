// 引用百度地图微信小程序JSAPI模块 
//var bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
var amapFile = require('../../libs/amap-wx.js');
var util = require('../../utils/util.js');
var wxMarkerData = [];
var timer//定时器
var point = []//绘图的点
var that2
var t = 0
//var time = []//存储前五个时间
//var time2 = []//存储对应的纬度
var n = -1;
var key = 0
var kk = 0
var latitude1, longitude1
var biaoji = 0
var min = 0
var markersData = [];
var place=''//临时解析出来的变量

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    polyline: [],
    time: '',
    x: '',
    buildingname: {},
    textData1:{},
    city:'',
    textData:{}

  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
 

  onLoad: function (e) {
    that2=this;
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'd4c21e5103fc34b2209ab1946425c764' });
    var params = {
        iconPathSelected: '../../img/marker_checked.png',
        iconPath: '../../img/marker.png',
        success: function (data) {
          markersData = data.markers;
          var poisData = data.poisData;
          var markers_new = [];
          markersData.forEach(function (item, index) {
            markers_new.push({
              id: item.id,
              latitude: item.latitude,
              longitude: item.longitude,
              iconPath: item.iconPath,
              width: item.width,
              height: item.height
            })

          })
          if (markersData.length > 0) {
            that.setData({
              markers: markers_new
            });
            that.setData({
              city: poisData[0].cityname || ''
            });
            that.setData({
              latitude: markersData[0].latitude
            });
            that.setData({
              longitude: markersData[0].longitude
            });
            that.showMarkerInfo(markersData, 0);
          } else {
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                that.setData({
                  latitude: res.latitude
                });
                that.setData({
                  longitude: res.longitude
                });
                that.setData({
                  city: '北京市'
                });
              },
              fail: function () {
                that.setData({
                  latitude: 39.909729
                });
                that.setData({
                  longitude: 116.398419
                });
                that.setData({
                  city: '北京市'
                });
              }
            })
            that.setData({
              textData: {
                name: '抱歉，未找到结果',
                desc: ''
              }
            });
          }
        },
        fail: function (info) {
          // wx.showModal({title:info.errMsg})
        }
      }
      if (e && e.keywords) {
        params.querykeywords = e.keywords;
      }
      myAmapFun.getPoiAround(params)
    
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },

  
 
  ////////////////////////////////以上默认代码
  //新写的
 
  start: function (e) {
    wx.showModal({
      title: '提示',
      content: '开始记录轨迹',
      success: function (res) {
        if (res.confirm) {
         
        } else if (res.cancel) {
          
        }
      }
    })
   console.log("开始按钮");
    countdown(e);
    //gettime();
  },
  end: function (e) {
    wx.showModal({
      title: '提示',
      content: '暂停记录轨迹',
      success: function (res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          
        }
      }
    })
    console.log("暂停按钮");
    console.log(t);

    console.log(n);
    console.log(key);
    clearTimeout(timer);
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
      path: '/pages/tu/tu?id=' + that.data.scratchId,
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

//画路线
function drawline() {
  var that = this
  that.setData({
    polyline: [{
      points: point,
      color: '#99FF00',
      width: 2,
      dottedLine: false
    }]
  });
}

//时间控制函数
function countdown(e) {

  timer = setTimeout(function () {

    console.log("res----------")
    getlocation1(e);
    n++;
    // console.log(this.latitude)
    countdown();

  }, 5000);


};

//计算时间
function gettime() {


}
//找最小时间值
function mintime(aar) {
  if (aar.length > 0) {
    var aar_Max = aar[0], aar_index = 0;
    for (var i = 0; i < aar.length; i++) {
      if (aar[i] < aar_Max) {//比较后赋值
        aar_Max = aar[i];
        aar_index = i;
      }
    }
    biaoji = aar_index
    min = aar_Max
  }
}
//获取经纬度
function getlocation1(e) {
  var that = this
  var myAmapFun = new amapFile.AMapWX({ key: 'd4c21e5103fc34b2209ab1946425c764' });
  wx.getLocation({
    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    success: function (res) {
      
      console.log("res22----------")
      if (n <= 4) {
         getApp().globalData.time5[n] = 0;
         getApp().globalData.place5[n] = 0;
      } else {
          if (res.latitude - latitude1 > 0.000001 || res.latitude - latitude1 < -0.000001 || res.longitude - longitude1 > 0.000001 || res.longitude - longitude1 < -0.000001) {
               if (kk <= 4) {
                   getApp().globalData.time5[kk] = key;
                   getApp().globalData.place5[kk] = { latitude1, longitude1 }
                    getPOI(longitude1, latitude1);
                    getApp().globalData.places[biaoji] = place
               } else {
                   if (key > min) {
                         mintime(getApp().globalData.time5)
                         getApp().globalData.time5[biaoji] = key;
                         getApp().globalData.place5[biaoji] = { latitude1, longitude1 };
                          getPOI(longitude1, latitude1);
                         getApp().globalData.places[biaoji]=place
                         key = 0;
                     }
                      }
             kk++;
             key = 0;
             //key +=1;
        } else {
          key += 5;
        }
      }
        latitude1 = res.latitude
        longitude1 = res.longitude
        
       
      point.push({ latitude: latitude1, longitude: longitude1 })
      // drawline();
      that2.setData({
        polyline: [{
          points: point,
          color: '#99FF00',
          width: 2,
          dottedLine: false
        }]
      });
      console.log(point)
      //console.log(that.latitude)
      console.log("enn----------")
    },
  })
  console.log(longitude1 + '=====')
  console.log('444')
  console.log(getApp().globalData.time5);
  console.log(getApp().globalData.place5);
};
//逆解析地址
function  getplace(){

}
;
function showMarkerInfo(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  };
function changeMarkerColor(data,i){
    var that = this;
    var markers = [];
    for(var j = 0; j < data.length; j++){
      if(j==i){
        data[j].iconPath = "../../img/marker_checked.png";
      }else{
        data[j].iconPath = "../../img/marker.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
  }
function getPOI(b,a) {
  var la=a.toFixed(6)
  var lo=b.toFixed(6)
  var all=lo+','+la;
  console.log(lo+'lolo')
  let that = this;
  let time1 = new Date().getTime();
  //test
  var amapFun = new amapFile.AMapWX({ key: 'd4c21e5103fc34b2209ab1946425c764' });
  console.log('正在逆解析')
  amapFun.getPoiAround({
    types: '010000',
    radius: '1000',
    iconPath: "../../img/marker.png",//指定本地图片
    location: all,//指定搜索厦门五缘湾坐标周边poi
    success(res) {
      console.log(res);//打印发现第一条数据的iconPath是undefined
      place=res.markers[0].name
      console.log(res.markers[0].name)
    },
    fail(err) {
      console.log(err)
      wx.showToast({
        title: err.errMsg
      });
    }
  });
  return;
  
}




