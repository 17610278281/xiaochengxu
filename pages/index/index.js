//index.js
//获取应用实例
var t = require('../index/indexJson.js');
const app = getApp()

Page({
  data: {
    motto: '<p>Hello World</p>',
    task: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    
  }
  ,onLoad: function () {
    this.setData({
      task: t.task
    })
  }
  ,onShareAppMessage: function() {
    return {
      title: '作业帮一课',
      path: '/page/index?id=123'
    }
  }
  ,onPullDownRefresh:function () {
    wx.stopPullDownRefresh();
  }
  ,getTaskList: function() {

  }
  ,btnTo: function(){
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    })
  }
});