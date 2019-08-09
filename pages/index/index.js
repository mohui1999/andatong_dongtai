//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    page: 1,
    dongtai_list: [], //动态列表

  },

  /*
  生命周期函数--监听页面加载
  打开动态页面时加载的内容
  */
  onLoad: function(options) {
    var that = this;
    that.loadingDTlist();
  },

  /*加载动态列表的函数*/
  loadingDTlist: function() {
    var that = this;
    var page = that.data.page;
    wx.request({
      //通过接口获取数据
      url: 'https://lzzzzl.top/useraction?page=' + page,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
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
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    var that = this;
    var page = that.data.page + 1;
    that.setData({
      page: page,
    })
    console.log(page);
    that.loadingDTlist();
  },

  /*用户点击跳转到详情页的函数*/
  toDetails: function(e) {
    var id = e.currentTarget.dataset.actionid; //获取当前动态ID
    console.log(id);
    wx.navigateTo({
      //实现跳转的函数，url附带跳转时传送的数据
      url: '/pages/dongtai_detail/dongtai_detail?id=' + id,
    })
  },

  /*用户点击跳转到用户个人主页的函数*/
  toPerPage: function(e) {
    var id = e.currentTarget.dataset.authorid; //获取当前用户ID
    console.log(id);
    wx.navigateTo({
      //实现跳转的函数，url附带跳转时传送的数据
      url: '/pages/personal_page/personal_page?id=' + id,
    })
  },

  /*加入写动态界面*/
  toCreatDT: function (e) {
    var id = e.currentTarget.dataset.authorid; //获取当前用户ID
    console.log(id);
    wx.navigateTo({
      //实现跳转的函数，url附带跳转时传送的数据
      url: '/pages/dongtai_create/dongtai_create',
    })
  },

  /*用户点击赞数的增加减少*/
  likeNum: function(e) {
    console.log("开始点赞");
    var that = this;
    var actionid = e.currentTarget.dataset.actionid; //获取当前动态ID
    var index = e.currentTarget.dataset.index;
    console.log(actionid);
    console.log("序号"+index);
    wx.request({
      //通过接口获取数据
      url: 'https://lzzzzl.top/change_like_num_action',
      method: 'POST',
      data: Util.json2Form({
        OnsUha: "201714192",
        userAvatar: "http://xiemenglei.cn/wp-content/uploads/2019/07/avatar.jpg",
        action_id: actionid,
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },     
      success: function(res) {
        console.log("开始点赞数" + that.data.dongtai_list[index].like_num);
        console.log(res.data.status);
        console.log(that.data.dongtai_list[index].like_users);
        var x;
        var hasme = 0;
        var list = that.data.dongtai_list[index].like_users;
        for (x in list) {
          if(list[x] == "201714192"){
            hasme = 1;
            var user_index = x;
            break;
          }else{
            hasme = 0;
          }
        };
        console.log(hasme);
        var changelike = "dongtai_list[" + index + "].like_num";
        var plusLikeNum = that.data.dongtai_list[index].like_num + 1;
        var reduceLikeNum = that.data.dongtai_list[index].like_num - 1;
        var changeuser = "dongtai_list[" + index + "].like_users";
        if(hasme == 1){
          delete list[user_index];
          that.setData({
            [changelike]: reduceLikeNum,
            [changeuser]: list,
          })
        }else{
          list.push("201714192");
          that.setData({
            [changelike]: plusLikeNum,
          })
        }
        console.log("最终点赞数"+that.data.dongtai_list[index].like_num);

      }
    })
  }

})

var that;
var Util = require('../../utils/util.js');