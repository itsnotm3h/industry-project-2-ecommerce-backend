CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE countries (
    country_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_code CHAR(3) NOT NULL,
    country_name TEXT NOT NULL
);

CREATE TABLE addresses (
    address_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    address_line VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country CHAR(3) NOT NULL,
    level VARCHAR(10),
    unit VARCHAR(10)
);

CREATE TABLE users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type ENUM("customer","admin") NOT NULL,
    address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (address_id) REFERENCES addresses (address_id) ON DELETE CASCADE
);

CREATE TABLE admin_session_log (
    admin_session_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    user_action VARCHAR(255) NOT NULL
);

CREATE TABLE customer_session_log (
    customer_session_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    user_action VARCHAR(255) NOT NULL
);



CREATE TABLE public_session_log(
    public_session_id VARCHAR(255) UNIQUE PRIMARY KEY,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    user_id INT UNSIGNED,
    user_action VARCHAR(255) NOT NULL
);

CREATE TABLE public_cart (
    public_cart_no INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    public_session_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (public_session_id) REFERENCES public_session_log (public_session_id),
    product_id INT UNSIGNED NOT NULL,
    product_price DECIMAL(10,2) NOT NULL,
    product_qty INT UNSIGNED
);


CREATE TABLE products (
    product_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_price DECIMAL(10,2) NOT NULL,
    product_image VARCHAR(255)NOT NULL,
    product_stock INT UNSIGNED
);

CREATE TABLE categories (
    category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    user_id INT UNSIGNED NOT NULL
);

CREATE TABLE product_category (
    no INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,
    product_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE product_dimension(
    pd_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pd_height DECIMAL(3,1),
    pd_width DECIMAL(3,1),
    pd_depth DECIMAL(3,1),
    pd_diameter DECIMAL(3,1),
    pd_circumference DECIMAL(3,1),
    product_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
)




-- Not yet create

CREATE TABLE orders (
    order_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    product_quantity INT UNSIGNED NOT NULL,
    session_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(session_id) REFERENCES customer_session_log(customer_session_id),
    delivery_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(delivery_id) REFERENCES deliveries(delivery_id)
);

--- Not yet create
CREATE TABLE payments (
    payment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    session_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(session_id) REFERENCES customer_session_log(customer_session_id),
    payment_type ENUM("paynow","cc") NOT NULL,
    payment_amount DECIMAL(10,2),
    payment_status ENUM("pending","failed") NOT NULL,
    promo_code VARCHAR(50)
);

CREATE TABLE deliveries (
    delivery_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payment_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(payment_id) REFERENCES payments(payment_id),
    address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(address_id) REFERENCES addresses(address_id),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    tracking_id INT UNSIGNED NOT NULL,
    delivery_status ENUM("pending","cancelled","returned","dispatching","delivered") NOT NULL,
    start_date DATETIME,
    delivery_date DATETIME,
    delivery_type ENUM("express","normal","self-collection") NOT NULL
);

CREATE TABLE price_log (
    price_session_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    previous_price DECIMAL(10,2) NOT NULL,
    updated_price DECIMAL(10,2) NOT NULL,
    product_id INT UNSIGNED,
    FOREIGN KEY(product_id) REFERENCES products (product_id),
    user_id INT UNSIGNED,
    FOREIGN KEY(user_id) REFERENCES users (user_id)
);


CREATE TABLE promo_code (
    promo_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    promo_code VARCHAR(50),
    start_date DATETIME,
    end_date DATETIME,
    promo_limit INT,
    promo_type ENUM("one-time","multiple") NOT NULL,
    discount_rate DECIMAL(1,1) NOT NULL
);



ALTER TABLE products
ADD product_name VARCHAR(255) NOT NULL;

ALTER TABLE products
ADD product_description VARCHAR(255) NOT NULL;

ALTER TABLE products
ADD product_type VARCHAR(255) NOT NULL;

ALTER TABLE products
ADD product_series VARCHAR(255) NOT NULL;