// pages/submit_order/submit_order.js
const { init } = require("@cloudbase/wx-cloud-client-sdk");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // menuPosition: wx.getMenuButtonBoundingClientRect(),
    deliveryList: [], // 快递列表
    totalPrice: 0,
    totalCount: 0,
    tipShow: false,
    db: "",
    models: ""
  },

  showModal() {
    this.setData({
      tipShow: true
    })
  },

  async calculateTotal() {
    // this.data.db.collection('adam-express-order').get().then(res => {
    //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //   console.log(res)
    //   this.setData({
    //     deliveryList: res.data
    //   })
    //   let totalPrice = 0;
    //   let totalCount = this.data.deliveryList.length;

    //   deliveryList.forEach(item => {
    //     totalPrice += item.price;
    //   });

    //   this.setData({
    //     totalPrice: totalPrice,
    //     totalCount: totalCount
    //   });
    // })

    try {
      wx.showLoading({
        title: '获取订单信息',
      })
      const res = await this.data.db.collection('adam-express-order').get()
      wx.hideLoading()
      console.log(res)
      this.setData({
        deliveryList: res.data
      })
      let totalPrice = 0;
      let totalCount = this.data.deliveryList.length;

      this.data.deliveryList.forEach(item => {
        totalPrice += item.price;
      });

      this.setData({
        totalPrice: totalPrice,
        totalCount: totalCount
      });
    } catch (error) {
      wx.showToast({
        title: '获取数据失败',
        icon: 'error'
      })
    }

  },

  handleChildEvent(event) {
    // 从 event.detail 中获取子组件传递的数据
    const delivery = event.detail;
    // console.log(delivery)
    this.setData({
      deliveryList: [...this.data.deliveryList, delivery]
    })
    wx.showToast({
      title: '添加快递成功',
    })
    // this.calculateTotal()
  },

  onLongPress: function (event) {
    console.log(event)

    const index = event.currentTarget.dataset.index;
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.deleteRow(index);
        }
      }
    });
  },

  deleteRow: function (index) {
    const deliveryList = this.data.deliveryList;
    deliveryList.splice(index, 1);
    this.setData({
      deliveryList: deliveryList
    });
  },

  // only for test
  getOpenid: async function name(params) {
    
    const {
      data
    } = await this.data.models.client.get({
      filter: {
        where: {
          wechat_openid: {
            $eq: "ooQhZ7O4UASW7RIiVmN5oHexvdjA",
          },
        },
      },
    });
    console.log(data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const wxcloud = init(wx.cloud);
    const models = wxcloud.models;
    this.setData({
      models: models,
      db: wx.cloud.database()
    })
    // this.calculateTotal()
    // this.getOpenid()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})