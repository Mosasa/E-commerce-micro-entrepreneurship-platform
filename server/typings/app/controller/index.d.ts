// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportAddress from '../../../app/controller/address';
import ExportCategory from '../../../app/controller/category';
import ExportCommodity from '../../../app/controller/commodity';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';
import ExportStore from '../../../app/controller/store';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    address: ExportAddress;
    category: ExportCategory;
    commodity: ExportCommodity;
    home: ExportHome;
    order: ExportOrder;
    store: ExportStore;
  }
}
