import { Service } from 'egg';

interface IAddress {
  address: string;
  creatorId: string;
  mobile: string;
  id?: number;
  isDefault: number;
  recipient: string;
}

export default class Address extends Service {
  async list(params) {
  const { mysql } = this.app;
  try {
      let addresses = [];
      if (params.isDefault === 'true') {
        addresses = await mysql.select('addresses', {
          where: {
            creatorId: params.creatorId,
            isDefault: Boolean(params.isDefault),
          },
        });

      } else {
        addresses = await mysql.select('addresses', {
          where: {
            creatorId: params.creatorId,
          },
        });
      }

      return {
        errCode: 0,
        data: addresses,
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async create(params: IAddress) {
    const { mysql } = this.app;
    try {
      await mysql.insert('addresses', params);
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

  async update(params: IAddress) {
  const { mysql } = this.app;
  try {
      const options = {
        where: {
          id: params.id,
        },
      };
      await mysql.update('addresses', params, options);
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

  async updateDefault(params: IAddress) {
  const { mysql } = this.app;
  try {
      const result = await mysql.get('addresses', { creatorId: params.creatorId, isDefault: 1 });
      if (result) {
        await mysql.update('addresses', {
          id: result.id,
          isDefault: -1,
        });
      }
      const options = {
        where: {
          id: params.id,
        },
      };
      await mysql.update('addresses', {
        isDefault: 1,
      }, options);
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

  async detail(params: { id: number }) {
    const { mysql } = this.app;
    try {
      const { id } = params;
      const result = await mysql.get('addresses', { id });

      if (result) {
        return {
          errCode: 0,
          data: result,
        };
      } else {
        return {
          errCode: 1,
          errMsg: '没有该地址',
        };
      }
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
}
