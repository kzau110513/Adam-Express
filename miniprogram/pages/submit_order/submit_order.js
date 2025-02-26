// pages/submit_order/submit_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuPosition: wx.getMenuButtonBoundingClientRect(),
    goodsList: [
      { trackingNumber: '88888888888888888888123456789', name: '商品A', price: 100, remark: '无' },
      { trackingNumber: '987654321', name: '商品B', price: 200, remark: '易碎' },
      { trackingNumber: '456789123', name: '商品C', price: 150, remark: '无' },
      // { trackingNumber: '456789123', name: '商品C', price: 150, remark: 'you' },
      // 可以继续添加更多货物信息
    ],
    totalPrice: 0,
    totalCount: 0,
    tipShow:false,
    title:"",
    desc:"",
    url:"",
  },

  showModal(){
    this.setData({
      tipShow:true
    })
  },

  calculateTotal() {
    const goodsList = this.data.goodsList;
    let totalPrice = 0;
    let totalCount = goodsList.length;

    goodsList.forEach(item => {
      totalPrice += item.price;
    });

    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount
    });
  },

  handleChildEvent(event) {
    // 从 event.detail 中获取子组件传递的数据
    const good  = event.detail;
    // console.log(good)
    this.setData({
      goodsList:[...this.data.goodsList, good]
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
    const goodsList = this.data.goodsList;
    goodsList.splice(index, 1);
    this.setData({
      goodsList: goodsList
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculateTotal()
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