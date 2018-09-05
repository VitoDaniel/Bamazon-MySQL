-- if database named "bamazon" already exist - drop it.
DROP DATABASE IF EXISTS bamazon;
-- create new "bamazon" database
CREATE database bamazon;

-- actually use it.
USE bamazon;


-- create table named "products" that will contain store invertory.
CREATE TABLE products (
    item_id INTEGER(50) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(50),
    PRIMARY KEY (item_id)
);

-- insert data into "product" table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Canon 6D', 'Camera Body Only', 1249.99, 13),
('Canon 5D Mark IV', 'Camera Body Only', 3030.00, 5),
('Canon 70D', 'Camera Body Only', 700.00, 32),
('Canon 50mm F1.4', 'Lenses', 350.00, 40),
('Canon 16-35mm F2.8', 'Lenses', 1400.00, 12),
('Tamron 70-200mm F2.8', 'Lenses', 1199.99, 8),
('Tamron 24-70mm F2.8', 'Lenses', 1199.99, 15),
('DJI Spark', 'Drones', 599.99, 24),
('DJI Mavic', 'Drones', 999.99, 7),
('DJI Mavic Zoom', 'Drones', 1499.99, 14),
('DJI Osmo Mobile', "Stabilizers", 200.00, 45),
('DJI Ronin-M', 'Stabilizers', 1000.00, 14)
