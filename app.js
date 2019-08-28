//app.js
const AV = require('/utils/av-weapp-min.js');
AV.init({
  appId: 'pTf5kDMERjsFopcOt9mO4C3e-gzGzoHsz',
  appKey: 'YRb4tW0mekPrVHpCHzokI3Bf'
})
App({ 
	globalData: {
	    userInfo: null, 
      time1:null,
      currentCourse: [], // 周课程列表
      time5:[],
      place5:[],
      places:[]
    
	},
	onLaunch: function () { 
    this.globalData.currentCourse.push({ id: 0, type: 1, day: 4, start: 3, sections: 2, course: "计算机", teacher: "刘老师", place: "中和楼" });
    this.globalData.currentCourse.push({ id: 1, type: 0, day: 1, start: 5, sections: 2, course: "数学", teacher: "谢老师", place: "至善楼" })
    this.globalData.currentCourse.push({ id: 2, type: 2, day: 2, start: 1, sections: 3, course: "英语", teacher: "吴老师", place: "理学院" })
    this.globalData.currentCourse.push({ id: 3, type: 1, day: 3, start: 1, sections: 2, course: "体育", teacher: "吴老师", place: "田径场" })
    this.globalData.currentCourse.push({ id: 4, type: 2, day: 2, start: 5, sections: 3, course: "物理", teacher: "钱老师", place: "田径场" }) 
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) { 
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo 
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  };
                }
              })
            }
          }
        }); 


    },
    //获取
    getOneDayData(dayId){
		let obj = wx.getStorageSync(dayId);
		return obj;
    },
    getOneItemData(dayId,itemId){
    	let dayData = wx.getStorageSync(dayId); 
    	for(let i in dayData){ 
    		if(i == itemId){ 
    			return dayData[itemId];
    		};
    	};
    },
    //添加
    addOneDayData(dayId,obj){  
    },
    addOneItemData(dayId,itemId,obj,fun){  
    	let dayData = wx.getStorageSync(dayId) || {};  
    	dayData[itemId] = obj;  
		wx.setStorage({
			key:dayId,
			data:dayData,
			success(){
				if(fun) fun();
			}
		});  	
    },
    //设置
    setOneDayData(dayId,obj){   
    },
    setOneItemData(dayId,itemId,obj){ 
    },
	//删除
    removeOneDayData(dayId){ 
    },
    removeOneItemData(dayId,itemId,fun){ 
    	let dayData = wx.getStorageSync(dayId) || {}; 
    	delete dayData[itemId]; 
		wx.setStorage({
			key:dayId,
			data:dayData,
			success(){
				if(fun) fun();
			}
		});
    }
});
