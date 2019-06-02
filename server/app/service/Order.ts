import { Service } from 'egg';
import * as _ from 'lodash';

interface IComToOrder {
  id?: number;
  total?: number;
  address?: string;
  mobile?: string;
  remark?: string;
  username?: string;
  commodities?: IOrder[];
  creatorId: string;
  storeId?: string;
  status?: number;
}

interface IOrder {
  id?: number;
  total?: number; // 总价
  sellNum?: number;
  status?: number;
  commodityId: number;
  linkId?: number;
}

interface IOrderStore {
  // storeId: string;
  uploadId: string;
  createDate?: string;
}

interface IOrderData {
  id: number;
  createDate: string;
  remark: string;
  stName: string;
  total: number;
  orders: any[];
}

export default class Order extends Service {
  /**
   * @description 客户获取订单列表
   * @params params
   */
  async listCustom(params: IComToOrder) {
    const { mysql } = this.app;
    try {

      if (!isNaN(params.status as number)) {
        const comOrders = await mysql.query('select comOrders.id, comOrders.createDate, comOrders.remark, stores.stName, comOrders.total from commodities_to_orders as comOrders, stores where comOrders.creatorId=? and comOrders.storeId=stores.bedroomId', [ params.creatorId ]);
        // const data = await Promise.all(comOrders.map(async comOrder => ({
        //   ...comOrder,
        //   orders: await mysql.query('select orders.id, orders.status, orders.sellNum, orders.total, orders.status, commodities.cmName, commodities.price, commodityImgs.url from orders, commodities, commodityImgs where orders.linkId=? and orders.commodityId=commodities.id and commodities.id=commodityImgs.commodityId and orders.status=?', [ comOrder.id, params.status ]),
        // })));

        const data: IOrderData[] = [];
        for (const comOrder of comOrders) {
          const orders = await mysql.query('select orders.id, orders.status, orders.sellNum, orders.total, orders.status, commodities.cmName, commodities.price, commodityImgs.url from orders, commodities, commodityImgs where orders.linkId=? and orders.commodityId=commodities.id and commodities.id=commodityImgs.commodityId and orders.status=?', [ comOrder.id, params.status ]);
          data.push({
            id: comOrder.id,
            createDate: comOrder.createDate,
            remark: comOrder.remark,
            stName: comOrder.stName,
            total: comOrder.total,
            orders,
          });
        }

        return {
          errCode: 0,
          data: data.filter(d => d.orders.length > 0),
        };

      } else {
        const comOrders = await mysql.query('select comOrders.id, comOrders.createDate, comOrders.remark, stores.stName, comOrders.total from commodities_to_orders as comOrders, stores where comOrders.creatorId=? and comOrders.storeId=stores.bedroomId', [ params.creatorId ]);
        const data: IOrderData[] = [];
        for (const comOrder of comOrders) {
          const orders = await mysql.query('select orders.id, orders.status, orders.sellNum, orders.total, orders.status, commodities.cmName, commodities.price, commodityImgs.url from orders, commodities, commodityImgs where orders.linkId=? and orders.commodityId=commodities.id and commodities.id=commodityImgs.commodityId', [ comOrder.id ]);
          data.push({
            id: comOrder.id,
            createDate: comOrder.createDate,
            remark: comOrder.remark,
            stName: comOrder.stName,
            total: comOrder.total,
            orders,
          });
        }

        return {
          errCode: 0,
          data: data.filter(d => d.orders.length > 0),
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  /**
   * @description 商家获取订单列表
   * @params params
   */
  async listStore(params: IOrderStore) {
    const { mysql } = this.app;
    try {
      // const comOrders = await mysql.select('orders', {
      //   where: {
      //     ...params,
      //     uploadId: params.uploadId,
      //   },
      // });
      let comOrders = [];
      if (params.createDate) {
        comOrders = await mysql.query('select orders.id, comOrder.createDate, com.cmName, orders.sellNum, orders.total, orders.status, comOrder.remark, user.nickName, orders.linkId from orders, commodities_to_orders as comOrder, commodities as com, wxUserInfo as user where orders.uploadId=? and DATE_FORMAT(orders.createDate, "%Y-%c-%d")=DATE_FORMAT(?, "%Y-%c-%d") and orders.linkId = comOrder.id and com.id = orders.commodityId and comOrder.creatorId = user.openid', [ params.uploadId, params.createDate ]);
      } else {
        comOrders = await mysql.query('select orders.id, comOrder.createDate, com.cmName, orders.sellNum, orders.total, orders.status, comOrder.remark, user.nickName, orders.linkId from orders, commodities_to_orders as comOrder, commodities as com, wxUserInfo as user where orders.uploadId = ? and orders.linkId = comOrder.id and com.id = orders.commodityId and comOrder.creatorId = user.openid', [ params.uploadId ]);
      }
      return {
        errCode: 0,
        data: comOrders,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async create(params: IComToOrder[]) {
    const { mysql } = this.app;
    try {
      const results = await Promise.all(params.map(async param => {
        const result = await mysql.insert('commodities_to_orders', _.omit(param, 'commodities'));
        if (result.affectedRows === 1) {
          const maxId = await mysql.query('select max(id) from commodities_to_orders');
          const linkId = maxId[0]['max(id)'];

          for (let i = 0; i < (param.commodities as IOrder[]).length; i++) {
            const commodity = (param.commodities as IOrder[])[i];
            const commod = await mysql.get('commodities', { id: commodity.commodityId });
            const orderRes = await mysql.insert('orders', {
              ...commodity,
              uploadId: commod.creatorId,
              linkId,
            });
  
            if (orderRes.affectedRows === 1) {
              await mysql.update('commodities', {
                ...commod,
                sellNum: commod.sellNum + commodity.sellNum,
              });
  
              // 同步更新用户信息
              const user = await mysql.get('wxUserInfo', {
                openid: commod.creatorId,
              });
              await mysql.update('wxUserInfo', {
                income: user.income + commodity.total,
                orderNum: user.orderNum + 1,
              }, {
                where: {
                  openid: user.openid,
                },
              });
            }
          }
  
          // 同步更新商店信息
          const store = await mysql.get('stores', {
            bedroomId: param.storeId,
          });
          await mysql.update('stores', {
            incomeTotal: store.incomeTotal + param.total,
            orderTotal: (param.commodities as []).length + store.orderTotal,
          }, {
            where: {
              bedroomId: param.storeId,
            },
          });
  
          return {
            errCode: 0,
            data: 'success',
          };
        } else {
          return {
            errCode: 1,
            data: '创建失败',
          };
        }
      }));

      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        if (element.errCode !== 0) {
          return element;
        } 
      }

      return {
        errCode: 0,
        data: 'success',
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }
  /**
   * @description 订单详情
   * @params params
   */
  async getOrderCommodity(params) {
    const { mysql } = this.app;
    try {
      // const data = await mysql.select('orders', {
      //   where: {
      //     linkId: params.linkId,
      //   },
      // });

      const comOrders = await mysql.get('commodities_to_orders', {
        id: params.id,
      });

      const orders = await mysql.query('select orders.sellNum, orders.id, orders.status, orders.total, commodities.cmName, commodities.creatorId from orders, commodities where orders.commodityId = commodities.id and orders.linkId = ?', [params.id]);

      comOrders.orders = orders;

      return {
        errCode: 0,
        data: comOrders,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async updateStatus(params) {
    const { mysql } = this.app;
    try {
      const result = await mysql.update('orders', params);

      if (result.affectedRows === 1) {
        return {
          errCode: 0,
          data: 'success',
        };
      } else {
        return {
          errCode: 1,
          errMsg: '更新失败',
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
