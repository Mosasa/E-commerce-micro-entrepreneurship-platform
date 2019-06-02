import { Service } from 'egg';

interface IStore {
  stName: string;
  bedroomId: string;
  status: number;
  address: string;
  incomeTotal: number;
  orderTotal: number;
}

export default class Store extends Service {
  async list() {
    const { mysql } = this.app;
    try {
      const stores = await mysql.select('stores', {
        orders: [[ 'incomeTotal', 'desc' ]],
        where: {
          status: 1,
        },
      });
      return {
        errCode: 0,
        data: stores,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async create(params: IStore) {
    const { mysql } = this.app;
    try {
      const result = await mysql.get('stores', { bedroomId: params.bedroomId });
      if (result) {
        return {
          errCode: 1,
          data: '已存在',
        };
      }
      const success = await mysql.insert('stores', params);
      if (success.affectedRows === 1) {
        return {
          errCode: 0,
          data: 'success',
        };
      } else {
        return {
          errCode: 1,
          data: '添加失败',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async update(params: IStore) {
  const { mysql } = this.app;
  try {
      const options = {
        where: {
          bedroomId: params.bedroomId,
        },
      };
      const success = await mysql.update('stores', params, options);
      if (success.affectedRows === 1) {
        return {
          errCode: 0,
          data: 'success',
        };
      } else {
        return {
          errCode: 1,
          data: '添加失败',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async detail(params: { bedroomId: string }) {
    const { mysql } = this.app;
    try {
      const { bedroomId } = params;
      const result = await mysql.get('stores', { bedroomId });

      if (result) {
        return {
          errCode: 0,
          data: result,
        };
      } else {
        return {
          errCode: 1,
          errMsg: '没有该商店',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async getMembers(params: { bedroomId: string }) {
    const { bedroomId } = params;
    const { mysql } = this.app;
    try {
      const list = await mysql.select('wxUserInfo', {
        where: {
          bedroomId,
        },
      });
      if (list) {
        return {
          errCode: 0,
          data: list,
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async getCustomer(params: { openid: string }) {
    const { mysql } = this.app;
    try {
      const { openid } = params;
      const customers = await mysql.query('select * from wxUserInfo where wxUserInfo.openid in (select comOrder.creatorId from orders, commodities_to_orders as comOrder where orders.uploadId=? and comOrder.id=orders.linkId)', [ openid ]);
      if (customers) {
        return {
          errCode: 0,
          data: customers,
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
