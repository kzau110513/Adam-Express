// pages/submit_order/submit_order.js
const {
  init
} = require("@cloudbase/wx-cloud-client-sdk");

const app = getApp()

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
    models: ""
  },

  showModal() {
    this.setData({
      tipShow: true
    })
  },

  calculateTotal() {
    let totalPrice = 0;
    let totalCount = this.data.deliveryList.length;

    this.data.deliveryList.forEach(item => {
      totalPrice += item.price;
    });

    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount
    });
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
    this.calculateTotal()
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
    this.calculateTotal()
  },

  async submit_deliveries() {
    console.log("submit")
    const newDeliveries = this.data.deliveryList
    const client_id = wx.getStorageSync("client_id")
    newDeliveries.forEach(delivery => {
      delivery.client_id = {
        _id: client_id
      }
      delivery.status = 0
    });
    console.log(newDeliveries)
    try {
      const {
        data
      } = await app.globalData.models.domestic_delivery.create({
        // data: newDeliveries,
        // // envType: pre 体验环境， prod 正式环境
        // // envType: "pre",
        data: newDeliveries[0],
      });
      

      console.log(data);
    } catch (error) {
      console.log(error)
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.calculateTotal()
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