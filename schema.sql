DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INT NOT NULL,
product_name VARCHAR(45) NOT NULL, 
department_name VARCHAR(45) NOT NULL, 
price INT NOT NULL,
stock_quanity INT NOT NULL,
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
values ("toothpaste", "bath", 5, 100),
("shampoo", "bath", 6, 125),
("soap", "bath", 2, 150),
("dental floss", "bath", 3, 90),
("conditioner", "bath", 5, 125),
("toothbrush", "bath", 4, 100), 
("toilet paper", "bath", 15, 125), 
("fitted sheet", "bedroom", 20, 70), 
("flat sheet", "bedroom", 18, 70), 
("pillowcase", "bedroom", 12, 140);
SELECT * FROM products;




