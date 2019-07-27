// pages/personal_page/personal_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perPage_detail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      //调用接口获得个人主页的详细内容
      url: 'https://lzzzzl.top/personal_action?author_id=' + options.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          perPage_detail: res.data,
        })
      }
    })
  },

  /*用户点击跳转到详情页的函数*/
  toDetails: function (e) {
    var id = e.currentTarget.dataset.actionid; //获取当前动态ID
    console.log(id);
    wx.navigateTo({
      //实现跳转的函数，url附带跳转时传送的数据
      url: '/pages/dongtai_detail/dongtai_detail?id=' + id,
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