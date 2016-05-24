-- Schema - Structure of TT DB
CREATE TABLE users
(
   userId int NOT NULL AUTO_INCREMENT,
   emailAddress varchar(255) NOT NULL,
   userName varchar(255) NOT NULL,
  	password varchar(255) NOT NULL,
   name varchar(255) NOT NULL,
	role varchar(255) NOT NULL,
   date TIMESTAMP,
   PRIMARY KEY (userId)
);

CREATE TABLE ordersGen
(
    orderNumber int ZEROFILL NOT NULL AUTO_INCREMENT,
    date TIMESTAMP,
    userId int,
    FOREIGN KEY (userId) REFERENCES user(userId),
    PRIMARY KEY (orderNumber)
);

CREATE TABLE inventory
(
    barcode varchar(255) NOT NULL,
    sku varchar(255) NOT NULL,
    productName varchar(255) NOT NULL,
    productDescription varchar(255) NOT NULL,
    productImage varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    quantity int NOT NULL,
    price FLOAT NOT NULL,
    UpdateofInventory TIMESTAMP,
    supplier varchar(255),
    PRIMARY KEY (sku)
);

CREATE TABLE orders
(
    userId int,
    orderNumber int ZEROFILL NOT NULL AUTO_INCREMENT,
    barcode varchar(255) NOT NULL,
    quantityPurchased int NOT NULL,
<<<<<<< HEAD
    FOREIGN KEY (userId) REFERENCES user(userId),
=======
    userId int,
    FOREIGN KEY (userId) REFERENCES users(userId),
>>>>>>> origin
    FOREIGN KEY (orderNumber) REFERENCES ordersGen(orderNumber)
);
