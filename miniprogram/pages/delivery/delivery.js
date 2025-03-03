// pages/delivery/delivery.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuItems: [{
        key: 0,
        title: "未入库"
      },
      {
        key: 1,
        title: "已入库"
      }
    ],
    selectedStatus: 0,
    currentTab: 0, // 当前选中的tab
    isAllChecked: false, // 是否全选
    selectedCount: 0, // 已选择的件数
    tableData: [
      // {
      //   tracking_number: '123456789',
      //   goods_description: '商品A',
      //   price: '100元',
      //   remark: '无',
      //   checked: false,
      // },
      // {
      //   tracking_number: '987654321',
      //   goods_description: '商品B',
      //   price: '200元',
      //   remark: '无',
      //   checked: false,
      // },
      // 可以添加更多数据
    ],
    models: "",
    pageSize: 10,
    pageNumber: 1,
  },

  // 切换tab
  async onChangeTab(e) {
    const {
      key
    } = e.target.dataset
    this.setData({
      selectedStatus: key
    })
    await this.getDeliveryList(this.data.pageSize, this.data.pageNumber, this.data.selectedStatus)
  },

  // 选择单个快递
  selectItem(e) {
    const {
      index
    } = e.currentTarget.dataset

    const tableData = this.data.tableData;
    tableData[index].checked = !tableData[index].checked;

    this.setData({
      // [`tableData[${index}].checked`]: !cur_checked,
      tableData: tableData,
      selectedCount: tableData.filter(item => item.checked).length,
      isAllChecked: tableData.every(item => item.checked)
    })
  },

  // 全选/取消全选
  toggleAll() {
    const isAllChecked = !this.data.isAllChecked;
    const tableData = this.data.tableData.map(item => {
      item.checked = isAllChecked;
      return item;
    });

    this.setData({
      tableData,
      isAllChecked,
      selectedCount: isAllChecked ? tableData.length : 0
    });
  },

  // 提交订单
  submitOrder() {
    const selectedItems = this.data.tableData.filter(item => item.checked);
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择至少一件商品',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });

    // 这里可以添加提交订单的逻辑
  },

  navigateToTargetPage: function () {
    wx.navigateTo({
      url: '/pages/create_delivery/create_delivery'
    });
  },

  async getDeliveryList(pageSize, pageNumber, status) {
    try {
      const res_list = await app.globalData.models.domestic_delivery.list({
        filter: {
          where: {
            $and: [{
                client_id: {
                  $eq: wx.getStorageSync("client_id"),
                },
              },
              {
                status: {
                  $eq: status,
                },
              },
            ]
          },
        },
        pageSize: pageSize, // 分页大小，建议指定，如需设置为其它值，需要和 pageNumber 配合使用，两者同时指定才会生效
        pageNumber: pageNumber, // 第几页
        // getCount: true, // 开启用来获取总数
        // envType: pre 体验环境， prod 正式环境
        // envType: "pre",
      });
      console.log("//get delivery list from models")
      console.log(res_list)
      this.setData({
        tableData: res_list.data.records
      })
    } catch (error) {
      console.log("//" + error)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    if (typeof this.getTabBar === 'function') {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selected: 1
        })
      })
    }
    // console.log("test")
    this.getDeliveryList(this.data.pageSize, this.data.pageNumber, this.data.selectedStatus)
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