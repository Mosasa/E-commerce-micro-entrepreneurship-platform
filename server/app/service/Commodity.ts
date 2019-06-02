import { Service } from 'egg';
// import fs from 'fs';

export default class Commodity extends Service {
  async create(params) {
    try {
      const { mysql } = this.app;
      const result = await mysql.insert('commodities', params);
      return {
        errCode: 0,
        data: result.insertId,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async list(params) {
  try {
      const { mysql } = this.app;
      let list = await mysql.select('commodities', {
        where: {
          ...params,
          status: 1,
        },
      });
      list = await Promise.all(list.map(async item => {
        const res = await this.getImg({ commodityId: item.id });
        if (res.errCode === 0) {
          return {
            ...item,
            imgs: res.data,
          };
        }
      }));
      return {
        errCode: 0,
        data: list,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async listWithStore(params) {
    try {
        const { mysql } = this.app;
        let list = await mysql.select('commodities', {
          where: {
            ...params,
            storeId: params.storeId,
          },
        });
        list = await Promise.all(list.map(async item => {
          const res = await this.getImg({ commodityId: item.id });
          if (res.errCode === 0) {
            return {
              ...item,
              imgs: res.data,
            };
          }
        }));
        return {
          errCode: 0,
          data: list,
        };
      } catch (err) {
        return {
          errCode: -1,
          errMsg: err,
        };
      }
    }

  async getDetail(params) {
    try {
      const { mysql } = this.app;
      const commodity = await mysql.get('commodities', { id: params.id });
      if (commodity) {
        const imgsResult = await this.getImg({ commodityId: commodity.id });
        let imgs = [];
        if (imgsResult.errCode === 0) {
          imgs = imgsResult.data;
        }
        return {
          errCode: 0,
          data: {
            ...commodity,
            imgs,
          },
        };
      } else {
        return {
          errCode: 1,
          data: '商品不存在',
        };
      }
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async update(params) {
    try {
      const { mysql } = this.app;
      mysql.update('commodities', params);

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

  async delete(params) {
    try {
      const { mysql } = this.app;
      mysql.delete('addresses', params);
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

  async uploadImg(params) {
    try {
      const { mysql } = this.app;
      await mysql.insert('commodityImgs', params);
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

  async getImg(params) {
    try {
      const { mysql } = this.app;
      const imgs = await mysql.select('commodityImgs', {
        where: params,
      });
      return {
        errCode: 0,
        data: imgs.map(img => img.url),
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }
}
