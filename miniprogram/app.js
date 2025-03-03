// app.js
const {
  init
} = require("@cloudbase/wx-cloud-client-sdk");
App({
  globalData: {
    test: "test",
    models: ""
  },
  onLaunch: async function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      console.log("//initialize the program...")
      wx.cloud.init({
        //   env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-2gwarwx0ac347486',
        traceUser: true,
      });

      const client = init(wx.cloud);
      const models = client.models;
      this.globalData.models = models

      try {
        await this.getOpenid()
      } catch (error) {
        console.log("//program error occurs in initial phase (app.js)")
        console.log("//" + error)
      }
    }
  },

  async getOpenid(params) {
    if (wx.getStorageSync('client_id') !== "") {
      console.log("//client_id already in local storage")
    } else {
      console.log("//client_id not in local storage")

      // get the current openid
      console.log("//getting openid...")
      const {
        result
      } = await wx.cloud.callFunction({
        name: 'getOpenid',
        // data:{
        //   message:'helloCloud',
        // }
      })
      const openid = result.openid

      console.log("//getting client...")
      // initialize data models (wechat cloud)
      // const client = init(wx.cloud);
      // const models = client.models;
      // see if current openid already exists
      const res_get = await this.globalData.models.client.get({
        select: {
          _id: true,
        },
        filter: {
          where: {
            wechat_openid: {
              $eq: openid,
            },
          },
        },
      });
      
      let client_id = ""
      // this client is not in database
      if (!('_id' in res_get.data)){
        // create new client
        console.log("//create new client")
        const res_create = await this.globalData.models.client.create({
          data: {
            wechat_openid: openid,
          },
        });
        client_id = res_create.data.id
      }
      //  this client is in database, restore it in local storage
      else {
        console.log("//the client already exists")
        client_id = res_get.data._id
      }
      
      // store openid in local storage for future use
      console.log("//set client_id in local strorage")
      wx.setStorageSync('client_id', client_id)
    }
  },
});