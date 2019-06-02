import { Service } from 'egg';

interface ICategory {
  catName: string;
  id?: number;
  pid: number;
  sub?: ICategory[];
}

export default class Category extends Service {
  async list() {
    const { mysql } = this.app;
    try {
      const categories = await mysql.select('categories');
      return {
        errCode: 0,
        data: this.transform(categories),
      };
    } catch (err) {
      return {
        errCode: -1,
        errMsg: err,
      };
    }
  }

  async create(params: ICategory[]) {
    const { mysql } = this.app;
    try {
      const strArr = params.map(p => {
        if (!p.pid) {
          p.pid = 0;
        }

        return `('${p.catName}', '${p.pid}')`;
      });
      const str = strArr.join(',');
      await mysql.query(`insert into categories(catName, pid) values ${str}`);
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

  private transform(data: ICategory[], pid: number = 0) {
    return data.filter(d => d.pid === pid).map(d => ({
      ...d,
      name: d.catName,
      sub: this.transform(data, d.id),
    }));
  }
}
