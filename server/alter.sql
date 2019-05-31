use store;

-- alter table wxUserInfo change avatarUrl avatarUrl text;
-- alter table wxUserInfo add mobile VARCHAR(20);
-- alter table commondityImgs rename to commodityImgs;
-- alter table wxUserInfo add orderNum INT NOT NULL DEFAULT 0;

-- alter table stores add status INT;
-- alter table orders change id id INT AUTO_INCREMENT
alter table commodities_to_orders add mobile VARCHAR(13);
alter table commodities_to_orders add username VARCHAR(10);
-- alter table stores CHANGE incomTotal incomeTotal FLOAT NOT NULL DEFAULT 0 ;
-- alter table stores MODIFY orderTotal INT NOT NULL DEFAULT 0 ;
-- alter table stores MODIFY status INT NOT NULL DEFAULT 0 ;