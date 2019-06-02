import { Controller } from 'egg';

export default class OrderController extends Controller {
  async listCustom() {
    const { ctx } = this;
    const query = ctx.request.query;
    const params = {
      ...query,
      creatorId: query.creatorId,
      status: parseInt(query.status),
    };
    ctx.body = await ctx.service.order.listCustom(params);
  }

  async listStore() {
    const { ctx } = this;
    const query = ctx.request.query;
    const params = {
      ...query,
      uploadId: query.uploadId,
      // storeId: query.storeId,
    };
    ctx.body = await ctx.service.order.listStore(params);
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = data.map(d => {
      const param = {
        creatorId: d.creatorId,
        storeId: d.storeId,
        address: d.address,
        username: d.username,
        remark: d.remark,
        mobile: d.mobile,
        total: d.commodities.reduce((acc, current) => {
          return acc + current.total;
        }, 0),
        commodities: d.commodities,
      };

      return param;
    })
    ctx.body = await ctx.service.order.create(params);
  }

  async getDetail() {
    const { ctx } = this;
    const params = {
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.order.getOrderCommodity(params);
  }

  async update() {
    const { ctx } = this;
    const params = {
      id: ctx.params.id,
      status: ctx.request.body.status,
    };
    ctx.body = await ctx.service.order.updateStatus(params);
  }
}
