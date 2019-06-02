import { Controller } from 'egg';

export default class AccountController extends Controller {

  async wxRegister() {
    const { ctx } = this;
    const params = ctx.request.body;
    const resource = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
      dataType: 'json',
      data: {
        appid: 'wx9318960ce24cdd14', // mosa
        secret: '35c7ecc5493a6cc519bedb4bdbc63e97', // mosa
        // appid: 'wx40b7369508bcb7e8', // ray
        // secret: '17505842ba373cf8af3c89f88f45ebcd',  // ray
        js_code: params.code,
        grant_type: 'authorization_code',
      },
    });

    ctx.body = await ctx.service.account.wxRegister(resource.data);
  }

  async setUserInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.body = await ctx.service.account.setUserInfo({
      ...params,
    });
  }

  async updateUserInfo() {
    const { ctx } = this;
    const params = ctx.request.body;
    ctx.body = await ctx.service.account.updateUserInfo({
      ...params,
      openid: ctx.params.openid,
    });
  }

  async getUserInfo() {
    const { ctx } = this;
    // const resource = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
    //   dataType: 'json',
    //   data: {
    //     appid: 'wx40b7369508bcb7e8',
    //     secret: '17505842ba373cf8af3c89f88f45ebcd',
    //     js_code: ctx.params.code,
    //     grant_type: 'authorization_code',
    //   },
    // });
    ctx.body = await ctx.service.account.getUserInfo({
      openid: ctx.params.openid,
    });
  }
}
