// components/goodModal.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    tipShow: Boolean,
    good:{
      trackingNumber: "",
      name: "",
      price: 0,
      remark: "",
    }
  },
  observers: {
    tipShow: function (value) {
      this.setData({ isShow: value })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTNInput(event) {
      this.setData({
        'good.trackingNumber': event.detail.value // 更新 inputValue
      });
    },
    onNameInput(event) {
      this.setData({
        'good.name': event.detail.value // 更新 inputValue
      });
    },
    onPriceInput(event) {
      this.setData({
        'good.price': event.detail.value // 更新 inputValue
      });
      console.log(this.data.good.price)
    },
    onRemarkInput(event) {
      this.setData({
        'good.remark': event.detail.value // 更新 inputValue
      });
    },

    onClose(){
      this.setData({
        isShow:false
      })
    },

    sendDataToParent() {
      // 触发自定义事件 'myEvent'，并传递数据
      const good = {...this.data.good, price:Number(this.data.good.price)}
      this.triggerEvent('myEvent', good);
      wx.showToast({
        title: '添加货物成功',
      })
      this.setData({
        isShow:false
      })
    },
  }
})