//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    page: 1,
    dongtai_list: []    //动态列表

  },

  /*
  生命周期函数--监听页面加载
  打开动态页面时加载的内容
  */
  onLoad: function (options) {
    var that = this;
    that.setData({
      
    })
    that.loadingDTlist();
  },

  /*加载动态列表的函数*/
  loadingDTlist: function () {
    var that = this;
    var page = that.data.page;
    wx.request({
      //通过接口获取数据
      url: 'https://lzzzzl.top/useraction?page=' + page,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var new_item = res.data; //新获得的数据
        var old_item = that.data.dongtai_list; //之前已经获得的数据
        var arr_item = old_item.concat(new_item); //新旧数据合并
        that.setData({
          dongtai_list: arr_item,
        })
      }
    }) 
  },

  /*监听用户下拉动作，实现下拉刷新*/
  onPullDownRefresh: function () {
    var that = this;
    var page = 1;
    that.setData({
      page: page,
      dongtai_list: [],
    });
    wx.startPullDownRefresh();
    that.loadingDTlist();
    console.log('刷新数据');
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)

  },

  /*页面上拉触底函数处理函数，实现上拉加载数据*/
  onReachBottom: function () {
    var that = this;
    var page = that.data.page + 1;
    that.setData({
      page: page,
    })
    console.log(page);
    that.loadingDTlist();
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

  /*用户点击跳转到用户个人主页的函数*/
  toPerPage: function (e) {
    var id = e.currentTarget.dataset.authorid; //获取当前用户ID
    console.log(id);
    wx.navigateTo({
      //实现跳转的函数，url附带跳转时传送的数据
      url: '/pages/personal_page/personal_page?id=' + id,
    })
  },


})
