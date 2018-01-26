// pages/exercises/exercises.js
var e = require('../exercises/exercisesJson.js');
var app = getApp();
var timer="";
const recorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext()
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList:[],
    currentQnum: 0,
    qTotal: 0,
    tips: "点击下方按钮开始跟读",
    starShow: false,
    starList: [1, 2, 3, 4, 5],
    isRecord: false,
    isTyper:false,
    isMic: true,
    disabled: false,
    tempFilePath:"",
    isFinish: "下一题"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var than = this;
    console.log(e.exer.questionList[e.exer.currentQnum - 1]);
    this.setData({
      questionList: e.exer.questionList,
      currentQnum: e.exer.currentQnum,
      qTotal: e.exer.qTotal
    });
    if (this.data.currentQnum === e.exer.questionList.length) {
      this.setData({
        isFinish: '完成'
      })
    };

    // var audioUrl = e.exer.questionList[e.exer.currentQnum - 1].qOriRecord
    // console.log(audioUrl);
    // backgroundAudioManager.src = "http://tmp/wx4ac1e6343f44fe95.o6zAJsypbkgwEhOZtqP7OsjJ1jtk.4a18f9d6b961fa264fc426676ac9d832.durationTime=3249.mp3";
    // backgroundAudioManager.onPlay(() => {
    //   console.log('开始播放')
    // });
    wx.request({
      url: 'https://cn-shanghai.aliyun.webginger.cloud.ssapi.cn/',
      method: 'POST',
      data: {
        'isLogin': true,
        'audioUrl': 'http://tmp/wx4ac1e6343f44fe95.o6zAJsypbkgwEhOZtqP7OsjJ1jtk.4a18f9d6b961fa264fc426676ac9d832.durationTime=3249.mp3',
        'jsonText': "jsonText",
      },
      success: function (data) {}
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
  
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  initBtn: function () {
    this.setData({
      tipsShow: false,
      isTyper: true,
      isRecord: false,
      isPress: false,
      disabled: true
    })
  },
  record: function(e) {
    var than = this;
    var self = this.data;
    if (self.disabled) {
      return;
    };
    // 按钮为停止录音状态 点击停止录音
    if (self.isRecord) {
      than.initBtn();
      clearTimeout(timer);
      console.log(new Date());
      recorderManager.stop();
      recorderManager.onStop((res) => {
        console.log('recorder stop', res);
        console.log(new Date());
        this.setData({
          tempFilePath: res.tempFilePath,
          listenBtnShow: true,
          nextBtnShow: true,
          starShow: true,
          disabled: false,
          isTyper: false,
          isMic: true,
          isRecord: false
        })
      })
    } else {
      // 按钮为开始录音状态 点击开始录音
      this.setData({
        isRecord: true,
        listenBtnShow: false,
        starShow: false,
        isMic: false,
        nextBtnShow: false,
        disabled: true,
        waveShow: false,
        isTyper: false,
        playShow: true
      })
      self.recordStop = setTimeout(function () {
        self.disabled = false;
      }, 1000);
      const options = {
        duration: 5000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'mp3',
        frameSize: 50
      }
      recorderManager.start(options)
    }
  },
  listen: function(){
    console.log(this.data.tempFilePath);
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    });
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
  },
  updatedRecord: function() {

  },
  next: function(){
    if (this.data.currentQnum === e.exer.questionList.length) {
      console.log('ok!')
    } else {
      e.exer.currentQnum++;
      this.setData({
        currentQnum: e.exer.currentQnum
      });
      if (this.data.currentQnum === e.exer.questionList.length) {
        this.setData({
          isFinish: '完成'
        })
      }
      console.log(this.data.currentQnum);
      console.log(e.exer.questionList.length);
    }
  }
})