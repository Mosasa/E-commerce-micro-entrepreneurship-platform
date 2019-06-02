import { Controller } from 'egg';

export default class AddressController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.address.list(ctx.query);
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await ctx.service.address.create(data);
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      ...data,
      id: ctx.params.id,
    };

    ctx.body = await ctx.service.address.update(params);
  }

  async updateDefault() {
    const { ctx } = this;
    const data = ctx.request.body;
		  console.log('TCL: AddressController -> updateDefault -> data', data);
    ctx.body = await ctx.service.address.updateDefault(data);
  }

  async detail() {
    const { ctx } = this;
    const params = {
      id: ctx.params.id,
    };

    ctx.body = await ctx.service.address.detail(params);
  }

  async delete() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      id: data.id,
    };
    ctx.body = await ctx.service.address.delete(params);
  }
}
