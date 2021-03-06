DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("PC Part #1", "Hardware", 369.99, 50);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("PC Part #2", "Hardware", 565.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("PC Part #3", "Hardware", 1189.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("PC Part #4", "Hardware", 189.99, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Office Desk Chair", "Furniture", 119.95, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Office Desk w/ Drawers", "Furniture", 225.75, 20);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Office Floor Lamp", "Furniture", 59.99, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Operating System", "Software", 149.99, 40);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Productivity Software Package", "Software", 249.99, 40);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("Graphic Design Software Package", "Software", 349.99, 30);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
	department_id VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_id, department_name, over_head_costs) VALUES("1", "Hardware", 20000.00);
INSERT INTO departments(department_id, department_name, over_head_costs) VALUES("2", "Furniture", 17500.00);
INSERT INTO departments(department_id, department_name, over_head_costs) VALUES("3", "Software", 12000.00);