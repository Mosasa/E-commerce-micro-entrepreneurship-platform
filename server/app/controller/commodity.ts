import { Controller } from 'egg';
const fs  = require('fs');
const path = require('path');

export default class CommodityController extends Controller {
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    ctx.body = await ctx.service.commodity.list(data);
  }

  async listWithStore() {
    const { ctx } = this;
    const data = ctx.query;
    ctx.body = await ctx.service.commodity.listWithStore(data);
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      creatorId: data.openid,
      storeId: data.bedroomId,
      cmName: data.cmName,
      price: data.price,
      total: data.total,
      detail: data.detail,
      categoryId: data.categoryId,
    };
    ctx.body = await ctx.service.commodity.create(params);
  }

  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    if (!fs.existsSync(path.join('app/public/imgs'))) {
        fs.mkdirSync(path.join('app/public/imgs'));
    }
    const url = path.join('public/imgs', stream.filename);
    // 因为server和page在统一个目录下，把文件下在server里的话，小程序会同步更新，除非把两个文件夹分开。
    await stream.pipe(fs.createWriteStream(path.join('app', url)));

    const params = {
      commodityId: stream.fields.commodityId,
      url: 'http://localhost:7002/' + url,
    };

    ctx.body = await ctx.service.commodity.uploadImg(params);

  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const params = {
      ...data,
      id,
      storeId: data.bedroomId,
      creatorId: data.openid,
      // cmName: data.cmName,
      // price: data.price,
      // total: data.total,
      // detail: data.detail,
      // categoryId: data.categoryId,
      // sellNum: data.sellNum,
    };

    delete params.openid;
    delete params.bedroomId;
    ctx.body = await ctx.service.commodity.update(params);
  }

  async delete() {
    const { ctx } = this;
    const data = ctx.request.body;
    const params = {
      id: data.id,
      storeId: data.bedroomId,
      creatorId: data.openid,
    };
    ctx.body = await ctx.service.commodity.delete(params);
  }

  async detail() {
    const { ctx } = this;
    const params = {
      id: ctx.params.id,
    };
    ctx.body = await ctx.service.commodity.getDetail(params);
  }
}
