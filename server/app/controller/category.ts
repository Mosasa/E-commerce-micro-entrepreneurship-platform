import { Controller } from 'egg';

export default class CategoryController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = await ctx.service.categories.list();
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body.map(p => ({
      catName: p.catName,
      pid: p.pid,
    }));
    ctx.body = await ctx.service.categories.create(params);
  }
}
