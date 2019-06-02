// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/service/Account';
import ExportAddress from '../../../app/service/Address';
import ExportCategories from '../../../app/service/Categories';
import ExportCommodity from '../../../app/service/Commodity';
import ExportImg from '../../../app/service/Img';
import ExportOrder from '../../../app/service/Order';
import ExportStore from '../../../app/service/Store';
import ExportTest from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    account: ExportAccount;
    address: ExportAddress;
    categories: ExportCategories;
    commodity: ExportCommodity;
    img: ExportImg;
    order: ExportOrder;
    store: ExportStore;
    test: ExportTest;
  }
}
