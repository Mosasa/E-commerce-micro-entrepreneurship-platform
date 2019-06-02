import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.prefix('/api/v1');

  router.get('/', controller.home.index);

  router.post('/register', controller.account.wxRegister);  // 注册
  router.get('/userInfo/:openid', controller.account.getUserInfo);  // 获取用户信息
  router.post('/userInfo', controller.account.setUserInfo);   // 创建用户信息
  router.put('/userInfo/:openid', controller.account.updateUserInfo);  // 更新用户信息
  // eg. `${app.globalData.host}/userInfo/${app.globalData.openid}`

  router.get('/category', controller.category.list); // 获取分类
  router.post('/category', controller.category.create); // 创建分类

  router.get('/store', controller.store.list); // 获取商店列表
  router.post('/store', controller.store.create); // 创建商店
  router.put('/store/:bedroomId', controller.store.update); // 更新商店信息
  router.get('/store/:bedroomId', controller.store.detail); // 获取商店详情
  router.get('/store/getMembers/:bedroomId', controller.store.getMembers); // 获取商店成员
  router.get('/store/getCustomers/:openid', controller.store.getCustomers); // 获取顾客列表

  router.get('/commodity', controller.commodity.list); // 获取商品列表
  router.get('/storeCommodity', controller.commodity.listWithStore); // 获取商店商品列表
  router.put('/commodity/:id', controller.commodity.update);  // 更新商品信息
  router.get('/commodity/:id', controller.commodity.detail); // 获取商品信息
  router.post('/commodity', controller.commodity.create); // 创建商品
  router.post('/commodity/upload', controller.commodity.upload); // 上传商品图片
  router.delete('/commodity', controller.commodity.delete); // 删除商品

  router.get('/address', controller.address.list); // 获取地址列表
  router.post('/address', controller.address.create); // 创建地址
  router.put('/address/:id', controller.address.update); // 更新地址信息
  router.put('/addressDefault', controller.address.updateDefault); // 更新默认地址
  router.get('/address/:id', controller.address.detail); // 获取地址详情
  router.delete('/address', controller.address.delete); // 删除地址

  router.get('/storeOrder', controller.order.listStore);
  router.get('/customerOrder', controller.order.listCustom);
  router.put('/order/:id', controller.order.update);
  router.get('/order/:id', controller.order.getDetail);
  router.post('/order', controller.order.create);
  // router.delete('/order', controller.order.delete);
};
