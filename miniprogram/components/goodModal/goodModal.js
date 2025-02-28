// components/goodModal.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    tipShow: Boolean,
    // delivery:{
    //   tracking_number: "",
    //   goods_description: "",
    //   price: 0,
    //   remark: "",
    // }
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
    // 提交表格
    formSubmit: function (e) {
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
      this.sendDataToParent(e.detail.value)
    },
    formReset: function () {
      // console.log('form发生了reset事件')
      this.onClose()
    },

    onClose(){
      this.setData({
        isShow:false
      })
    },

    sendDataToParent(delivery) {
      // 触发自定义事件 'myEvent'，并传递数据
      delivery = {...delivery, price:Number(delivery.price)}
      this.triggerEvent('myEvent', delivery);
      this.setData({
        isShow:false
      })
    },
  }
})