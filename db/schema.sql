### Schema - SQL FILE

CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
  s_timestamp TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (id)
);
