# 接口文档

### 分类 category

#### 获取分类列表

http://localhost:7002/api/v1/category

method: GET
params: null

返回的数据结构
```json
{
  "errCode": 0,
  "data": [{
    "id": 1,
    "pid": 0,
    "catName": "食品",
    "name": "食品",
    "sub": []
  }]
}
```

#### 添加分类

http://localhost:7002/api/v1/category

method: POST
params:

```json
[{
  "catName": "食品"
}, {
  "catName": "饮料"
}]
```

返回的数据结构
```json
{
  "errCode": 0,
  "data": "success"
}
```

### 用户 userInfo

#### 创建用户信息

http://localhost:7002/api/v1/userInfo

method: POST
params:

```json
{
  "openid": "123456", // 必填
  "nickName": "黄小宝",
  "studentId": "201420180712",
  "avatarUrl": "string",
  "gender": 1, // 性别 1-男 2-女
  "country": "string",
  "province": "string",
  "city": "string",
  "bedroomId": "xy-308",
  "mobile": "13117815112",
  "income": 40, // 收入
  "orderNum": 1, // 订单数
  "language": "string",
  "orderTotal": 1 // 自家商店订单总数
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

#### 获取用户信息

http://localhost:7002/api/v1/userInfo/{openid}

method: GET
params:

```json
{
  "openid": "123456" // 必填
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": {
    "openid": "123456", 
    "nickName": "黄小宝",
    "studentId": "201420180712",
    "avatarUrl": "string",
    "gender": 1, // 性别 1-男 2-女
    "country": "string",
    "province": "string",
    "city": "string",
    "bedroomId": "xy-308",
    "mobile": "13117815112",
    "income": 40, // 收入
    "orderNum": 1, // 订单数
    "language": "string",
    "orderTotal": 1 // 自家商店订单总数
  }
}
```

#### 更新用户信息

http://localhost:7002/api/v1/userInfo/{openid}

method: PUT
params:

在url里面的参数

```json
{
  "openid": "123456" // 必填
}
```

body里的参数

```json
{
  "nickName": "黄小宝",
  "studentId": "201420180712",
  "avatarUrl": "string",
  "gender": 1, // 性别 1-男 2-女
  "country": "string",
  "province": "string",
  "city": "string",
  "mobile": "13117815112",
  "income": 40, // 收入
  "orderNum": 1, // 订单数
  "language": "string",
  "orderTotal": 1 // 自家商店订单总数
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

### 商店 store

#### 创建商店信息

http://localhost:7002/api/v1/store

method: POST
params:

```json
{
  "bedroomId": "xy-308", // 必填
  "stName": "商店名" // 默认为寝室号
}

```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

#### 获取商店列表

http://localhost:7002/api/v1/store

method: GET

返回的数据结构

```json
{
  "errCode": 0,
  "data": [
    {
      "stName": "xy-308",
      "bedroomId": "xy-308",
      "status": -1,
      "address": null,
      "incomeTotal": 43,
      "orderTotal": 2
    }
  ]
}
```

#### 修改商店信息

http://localhost:7002/api/v1/store/{bedroomId}

method: PUT
params:

在url里面的参数

```json
{
  "bedrommId": "xy-308" // 必填
}
```

body里的参数

```json

{
  "stName": "新的商店名",
  "status": -1, // 店铺的状态：-1-关业 1-开业
  "address": "店铺地址",
}

```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

#### 获取商店详情

http://localhost:7002/api/v1/store/{bedroomId}

method: GET
params:

在url里面的参数

```json
{
  "bedrommId": "xy-308" // 必填
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": {
    "stName": "xy-308",
    "bedroomId": "xy-308",
    "status": -1,
    "address": null,
    "incomeTotal": 43,
    "orderTotal": 2
  }
}
```

#### 获取商店成员

http://localhost:7002/api/v1/store/getMembers/{bedroomId}

method: GET
params:

在url里面的参数

```json
{
  "bedrommId": "xy-308" // 必填
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": [
    {
      "openid": "123456",
      "nickName": "黄小宝",
      "studentId": "201420180712",
      "avatarUrl": null,
      "gender": null,
      "country": null,
      "province": null,
      "city": null,
      "bedroomId": "xy-308",
      "mobile": "13117815112",
      "income": 40,
      "orderNum": 1,
      "language": null
    }
  ]
}
```

#### 获取顾客列表

http://localhost:7002/api/v1/store/getCustomers/{openid}

method: GET
params:

```json
{
  "openid": "123456" // 必填
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": [
    {
      "openid": "232222112",
      "nickName": "小白",
      "studentId": null,
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZU9OEx2HjYONrZLT1Q2Wz5wRt4FsW9lcutsEsPvoRpcFdHC9WynLLibqmuvKf80owjg/132",
      "gender": 2,
      "country": "China",
      "province": "Jiangxi",
      "city": "Fuzhou",
      "bedroomId": "xy-308",
      "mobile": "13117815133",
      "income": 3,
      "orderNum": 1,
      "language": "zh_CN"
    }
  ]
}
```

### 商品 commodity

#### 创建商品信息

http://localhost:7002/api/v1/commodity

method: POST
params:

```json
{
  "bedroomId": "xy-308", // 必填
  "openid": "123456", // 必填
  "categoryId": 9, // 分类id 必填
  "cmName": "沐浴露", // 商品名称  必填
  "price": 20, // 价格
  "total": 10, // 数量
  "detail": "先到先得啦" // 详情
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

#### 获取商品列表

http://localhost:7002/api/v1/commodity

method: GET

返回的数据结构

```json
{
  "errCode": 0,
  "data": [
    {
      "id": 2,
      "creatorId": "123456",
      "createDate": "2019-03-22T10:03:28.000Z", // 创建时间
      "modifyDate": "2019-03-22T10:03:28.000Z", // 修改时间
      "storeId": "xy-308",
      "cmName": "沐浴露",
      "price": 20,
      "categoryId": 9,
      "status": 1, // 商品状态 1-上架 -1-下架
      "detail": "先到先得啦",
      "total": 10, // 总的商品数
      "sellNum": 2, // 已出售的数量
      "imgs": []
    }
  ]
}
```

#### 获取商品详情

http://localhost:7002/api/v1/commodity/{id}

method: GET
params:

```json
{
  "id": 2 // 商品的id 必填
}
```


返回的数据结构

```json
{
  "errCode": 0,
  "data": {
    "id": 2,
    "creatorId": "123456",
    "createDate": "2019-03-22T10:03:28.000Z", // 创建时间
    "modifyDate": "2019-03-22T10:03:28.000Z", // 修改时间
    "storeId": "xy-308",
    "cmName": "沐浴露",
    "price": 20,
    "categoryId": 9,
    "status": 1, // 商品状态 1-上架 -1-下架
    "detail": "先到先得啦",
    "total": 10, // 总的商品数
    "sellNum": 2, // 已出售的数量
    "imgs": []
  }
}
```

#### 更新商品详情

http://localhost:7002/api/v1/commodity/{id}

method: PUT
params:

在url里面的参数

```json
{
  "id": 2 // 必填
}
```

在body里面的参数

```json
{
  "bedroomId": "xy-308", // 必填
  "openid": "123456", // 必填
  "cmName": "沐浴露",
  "price": 20,
  "categoryId": 9,
  "status": 1, // 商品状态 1-上架 -1-下架
  "detail": "先到先得啦",
  "total": 10, // 总的商品数
  "sellNum": 2, // 已出售的数量
  "imgs": []
}

```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

#### 删除商品

http://localhost:7002/api/v1/commodity

method: DELETE
params:

```json
{
  "id": 2, // 必填 商品id
  "bedroomId": "xy-308", // 必填
  "openid": "123456" // 必填
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

### 订单 order

#### 创建订单信息

http://localhost:7002/api/v1/order

method: POST
params:

```json
{
  "openid": "123456", // 必填
  "total": 3, // 下单的商品总数
  "address": "address", // 送货地址
  "bedroomId": "xy-308", // 必填，店铺id
  "commodities": [{
    "total": 3, // 购买商品总价
    "sellNum": 1, // 商品数量
    "remark": "备注",
    "commodityId": 1 // 商品id
  }]
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": "success"
}
```

### 商家订单列表
http://localhost:7002/api/v1/storeOrder

method: GET
params:

```json
{
  "uploadId": "123456", // 必填，自己的openid
  "createDate": "2019-03-22", // 创建订单时间
}
```

返回的数据结构

```json
{
  "errCode": 0,
  "data": [
    {
      "id": 1,
      "createDate": "2019-03-22T10:05:04.000Z",
      "cmName": "沐浴露",
      "sellNum": 2,
      "total": 40,
      "status": -1,
      "remark": "备注",
      "nickName": "小白",
      "linkId": 1
    }
  ]
}
```

### 买家订单列表
GET http://localhost:7002/api/v1/customerOrder?creatorId=o74cL0UVSsnY9I9gGtGdS3cTfbfs

method: GET
params:
### 订单详情
GET http://localhost:7002/api/v1/order/16

method: GET
params:

###  更新订单状态
PUT http://localhost:7002/api/v1/order/8

method: PUT
params:
{
  "status": 1
}

###  获取地址列表
GET http://localhost:7002/api/v1/address?creatorId=oBtm35WOsPS2CeZzZ2oWDlEJ_G5U

method: GET
params:

###  获取地址详情
GET http://localhost:7002/api/v1/address/4

method: GET
params:

###  创建地址信息
POST http://localhost:7002/api/v1/address

method: POST
params:

Content-Type: application/json

{
  "creatorId": "oBtm35WOsPS2CeZzZ2oWDlEJ_G5U",
  "address": "西区一栋308",
  "recipient": "小男友",
  "mobile": "13117815133"
}

###  更新地址详情
PUT http://localhost:7002/api/v1/address/3
Content-Type: application/json

method: PUT
params:

{
  "isDefault": 1
}

###  更新默认地址
PUT http://localhost:7002/api/v1/addressDefault
Content-Type: application/json

method: PUT
params:

{
  "id": 4,
  "creatorId": "oBtm35WOsPS2CeZzZ2oWDlEJ_G5U"
}

### 删除地址
DELETE http://localhost:7002/api/v1/address
Content-Type: application/json

method: DELETE
params:

{
  "id": 2
}
