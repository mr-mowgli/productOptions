-- to wipe data:
DROP DATABASE if EXISTS options;
create DATABASE options;
USE options;


-- to select:
select * from stocks;
select * from products;
select * from stores;

-- to run script run:
-- mysql -u root < database/resetDB.sql