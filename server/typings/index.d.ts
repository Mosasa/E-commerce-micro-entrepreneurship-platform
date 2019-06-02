import 'egg';

declare module 'egg' {
  interface IMysql {
    get(tableName: string, find: object): Promise<any>;
    query(sql: string, values?: any[]): Promise<any>;
    insert(tableName: string, values: object): Promise<any>;
    update(tableName: string, values: object, options?: object): Promise<any>;
    select(tableName: string, values?: object, options?: object): Promise<any>;
    delete(tableName: string, values?: object, options?: object): Promise<any>;
  }

  interface Application {
    mysql: IMysql;
  }
}