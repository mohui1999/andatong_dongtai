// pages/dongtai_detail/dongtai_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dongtai_detail: [],
    item: 1,
    tab: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      //调用接口获得个人主页的详细内容
      url: 'https://lzzzzl.top/comment_action?action_id=' + options.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          dongtai_detail: res.data,
        })
      }
    })
  },

  // 页面切换
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item,
    })
  },
  // tab切换
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
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