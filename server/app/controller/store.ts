import { Controller } from 'egg';

export default class StoreController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.store.list();
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      ...data,
      stName: data.stName,
      bedroomId: data.bedroomId,
    };
    ctx.body = await ctx.service.store.create(params);
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      ...data,
      bedroomId: ctx.params.bedroomId,
    };

    ctx.body = await ctx.service.store.update(params);
  }

  async detail() {
    const { ctx } = this;
    const params = {
      bedroomId: ctx.params.bedroomId,
    };

    ctx.body = await ctx.service.store.detail(params);
  }

  async getMembers() {
    const { ctx } = this;
    const params = {
      bedroomId: ctx.params.bedroomId,
    };

    ctx.body = await ctx.service.store.getMembers(params);
  }

  async getCustomers() {
    const { ctx } = this;
    const params = {
      openid: ctx.params.openid,
    };

    ctx.body = await ctx.service.store.getCustomer(params);
  }
}
