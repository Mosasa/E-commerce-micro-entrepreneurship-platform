USE store;

CREATE TABLE stores (
  stName VARCHAR(200),
  bedroomId VARCHAR(30) NOT NULL PRIMARY KEY,
  status INT default 1,
  address VARCHAR(100),
  incomeTotal FLOAT default 0,
  orderTotal INT default 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wxAccounts (
  openid VARCHAR(50) NOT NULL PRIMARY KEY,
  session_key VARCHAR(50),
  unionid VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wxUserInfo (
  openid VARCHAR(50) NOT NULL PRIMARY KEY,
  nickName VARCHAR(30),
  studentId VARCHAR(30),
  avatarUrl text,
  gender INT,
  country VARCHAR(30),
  province VARCHAR(30),
  city VARCHAR(30),
  bedroomId VARCHAR(30),
  mobile VARCHAR(20),
  income FLOAT DEFAULT 0,
  orderNum INT DEFAULT 0,
  language VARCHAR(10),
  FOREIGN KEY fk_userId(openid)
  REFERENCES wxAccounts(openid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pid INT,
  catName VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE commodities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  creatorId VARCHAR(30) NOT NULL,
  createDate DATETIME DEFAULT NOW(),
  modifyDate DATETIME DEFAULT NOW(),
  storeId VARCHAR(30) NOT NULL,
  cmName VARCHAR(100) NOT NULL,
  price FLOAT DEFAULT 0,
  categoryId INT,
  status INT DEFAULT 1,
  detail text,
  total INT DEFAULT 0,
  sellNum INT DEFAULT 0,
  FOREIGN KEY fk_com_storeId(storeId)
  REFERENCES stores(bedroomId)
  ON DELETE CASCADE,
  FOREIGN KEY fk_com_creatorId(creatorId)
  REFERENCES wxUserInfo(openid)
  ON DELETE CASCADE,
  FOREIGN KEY fk_categoryId(categoryId)
  REFERENCES categories(id)
  ON DELETE SET NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE commodityImgs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url TEXT NOT NULL,
  commodityId INT,
  FOREIGN KEY fk_commodityId(commodityId)
  REFERENCES commodities(id)
  ON DELETE CASCADE,
  modifyDate DATETIME DEFAULT NOW()
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE commodities_to_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total FLOAT DEFAULT 0,
  address text,
  creatorId VARCHAR(30) NOT NULL,
  storeId VARCHAR(30) NOT NULL,
  remark text,
  mobile VARCHAR(13),
  username VARCHAR(10),
  createDate DATETIME DEFAULT NOW()
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  createDate DATETIME DEFAULT NOW(),
  total FLOAT DEFAULT 0,
  sellNum INT DEFAULT 0,
  status INT DEFAULT -1,
  linkId INT NOT NULL,
  commodityId INT NOT NULL,
  uploadId VARCHAR(30) NOT NULL,
  FOREIGN KEY fk_linkId(linkId)
  REFERENCES commodities_to_orders(id)
  ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8; 

CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  createDate DATETIME DEFAULT NOW(),
  address VARCHAR(100),
  recipient VARCHAR(20),
  mobile VARCHAR(20),
  creatorId VARCHAR(50) NOT NULL,
  isDefault INT DEFAULT -1,
  FOREIGN KEY addr_creatorId(creatorId)
  REFERENCES wxAccounts(openid)
  ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8; 