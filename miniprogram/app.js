// app.js
const {
  init
} = require("@cloudbase/wx-cloud-client-sdk");
App({
  globalData: {},
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

      // initialize data models (wechat cloud)
      const client = init(wx.cloud);
      const models = client.models;

      try {
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
        // see if current openid already exists
        const {
          data
        } = await models.client.get({
          filter: {
            where: {
              wechat_openid: {
                $eq: openid, 
              },
            },
          },
        });

        // this client is not in database
        if (Object.keys(data).length === 0) {
          // create new client
          console.log("//create new client")
          await models.client.create({
            data: {
              wechat_openid: openid,
              full_name: ""
            },
          });
        }else{
          console.log("//the client already exists")
        }
        // store openid in local storage for future use
        wx.setStorageSync('openid', openid)
        
      } catch (error) {
        console.log("//program error occurs in initial phase (app.js)")
        console.log(error)
      }
    }

    this.globalData = {};
  }
});