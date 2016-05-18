-- Schema - Structure of TT DB
CREATE TABLE user
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
	FOREIGN KEY (userId) REFERENCES user(userId),
    PRIMARY KEY (orderNumber)
);

CREATE TABLE orders
(
    orderNumber int,
    sku varchar(255) NOT NULL,
    quantityPurchased int NOT NULL,
	userId int,
	FOREIGN KEY (userId) REFERENCES user(userId),
	FOREIGN KEY (sku) REFERENCES inventory(sku),
	FOREIGN KEY (orderNumber) REFERENCES inventory(orderNumber),
);
CREATE TABLE inventory
(
    barcode varchar(255) NOT NULL,
    sku varchar(255) NOT NULL,
    productDescription varchar(255) NOT NULL,
    productImage varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    quantity int NOT NULL,
    price FLOAT NOT NULL,
    UpdateofInventory TIMESTAMP,
    supplier varchar(255),
    PRIMARY KEY (sku)
);
