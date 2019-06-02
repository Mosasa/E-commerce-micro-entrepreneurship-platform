import { Service } from 'egg';

enum Gender {
  none,
  male,
  female,
}

// interface IAccount {
//   name?: string;
//   studentId: string;
//   bedroomId?: string;
//   password: string;
// }

interface IWXAccount {
  openid: string;
  session_key?: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

interface IWXUserInfo {
  nickName: string;
  avatarUrl: string;
  gender: Gender;
  country: string;
  province: string;
  city: string;
  language: 'en' | 'zh_CN' | 'zh_TW';
  openid: string;
  bedroomId: string;
}

export default class Account extends Service {
  // async register(params: IAccount) {
  //   try {
  //     const account = await this.app.mysql.get('accounts', { studentId: params.studentId });
  //     if (!account) {
  //       const store = await this.app.mysql.get('stores', { bedroomId: params.bedroomId });
  //       if (!store) await this.app.mysql.insert('stores', { bedroomId: params.bedroomId });
  //       const result = await this.app.mysql.insert('accounts', params);
  //       if (result.affectedRows === 1) {
  //         return {
  //           errCode: 0,
  //           data: 'success',
  //         };
  //       }
  //     } else {
  //       return {
  //         errCode: 1,
  //         errMsg: '用户已存在',
  //       };
  //     }
  //   } catch (err) {
  //     return {
  //       errCode: -1,
  //       errMsg: err,
  //     };
  //   }
  // }

  // async login(params: IAccount) {
  //   try {
  //     const { mysql } = this.app;
  //     const account = await mysql.get('accounts', params);
  //     if (!account) {
  //       return {
  //         errCode: 1,
  //         errMsg: '账号或密码错误',
  //       };
  //     } else {
  //       return {
  //         errCode: 0,
  //         data: account,
  //       };
  //     }
  //   } catch (err) {
  //     return {
  //       errCode: -1,
  //       errMsg: err,
  //     };
  //   }
  // }

  async wxRegister(params: IWXAccount) {
  try {
      if (!params.openid) {
        return {
          errCode: 2,
          errMsg: params.errmsg,
        };
      }
      const account = await this.app.mysql.get('wxAccounts', { openid: params.openid });
      if (!account) {
        const result = await this.app.mysql.insert('wxAccounts', {
          openid: params.openid,
          session_key: params.session_key,
        });
        if (result.affectedRows === 1) {
          return {
            errCode: 0,
            data: {
              openid: params.openid,
            },
          };
        }
      } else {
        return {
          errCode: 0,
          data: {
            openid: params.openid,
          },
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async setUserInfo(params: IWXUserInfo) {
    try {
      const userInfo = await this.app.mysql.get('wxUserInfo', { openid: params.openid });
      if (!userInfo) {
        const result = await this.app.mysql.insert('wxUserInfo', params);
        if (result.affectedRows === 1) {
          return {
            errCode: 0,
            data: 'success',
          };
        }
      } else {
        return {
          errCode: 1,
          data: '用户已存在',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async updateUserInfo(params: IWXUserInfo) {
    try {
      const options = {
        where: {
          openid: params.openid,
        },
      };
      const result = await this.app.mysql.update('wxUserInfo', params, options);
      if (result.affectedRows === 1) {
        return {
          errCode: 0,
          data: 'success',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async getUserInfo(params: IWXAccount) {
    try {
      const userInfo = await this.app.mysql.get('wxUserInfo', { openid: params.openid });
      const orders = await this.app.mysql.select('orders', {
        where: {
          uploadId: params.openid,
        },
      });
      if (userInfo) {
        userInfo.orderTotal = orders.length;
        return {
          errCode: 0,
          data: userInfo,
        };
      } else {
        return {
          errCode: 1,
          errMsg: '用户不存在',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

}
