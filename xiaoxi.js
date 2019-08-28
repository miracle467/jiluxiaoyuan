Page({

  data: {
    openid: "",
    session_key: "",
    access_token: "",
  },

  onLoad: function (options) {
    var that = this
    //第一步获取openid
    wx.login({
      success: function (data) {
        console.log(data.code, data)
        console.log("12345");
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wx3119e5eb5fe47fdb",
            secret: "6ee7633b25f7d5bb6dfc425f216401d2",
            js_code: data.code//wx.login获取到的code
          },
          method: "post",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res);
            that.setData({
              openid: res.data.openid,
              session_key: res.data.session_key,
            })
          }
        })
      }
    })
    //第二步  获取access_token
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3119e5eb5fe47fdb&secret=6ee7633b25f7d5bb6dfc425f216401d2',
      method: "GET",
      success: function (res) {

        console.log("xxx");
        console.log(res);
        that.setData({
          access_token: res.data.access_token,//获取到的access_token
        })
      }
    })
  },
  form: function (e) {
    console.log(e);
    var that = this;
    var fId = e.detail.formId; // 网络请求    
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token;
    var d = {
      touser: that.data.openid, //用户的openid      
      template_id: '1XAyfSU2W58lVEKg8VEE5fO3vNppbPSKRza8nK1Ajkw',
      page: '/pages/index/index',
      form_id: fId,
      data: {           //模板消息要对应 有几个写几个  避免为空模板
        "keyword1": {
          "value": "酒店",
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": "2018-03-22",
          "color": "#9b9b9b",
        },
        "keyword3": {
          "value": "$300",
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "中国",
          "color": "#9b9b9b"
        },
      },
      color: '#ccc',
      emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
      url: l,
      data: JSON.stringify(d),
      method: 'POST',
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
})
