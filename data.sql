INSERT INTO countries (country_code,country_name) VALUES ("SG","Singapore"),("MY","Malaysia"); 

INSERT INTO addresses (address_line, postal_code, country, level, unit) 
VALUES
('10 Marina Boulevard', '018983', 'SG', '50', '501'),
('1 Raffles Place', '048616', 'SG', '25', '2501'),
('1 Jalan Ampang', '50450', 'MY', '10', '10-01'),
('100 Jalan Bukit Bintang', '55100', 'MY', '5', '501');

INSERT INTO products (product_name, product_price, product_image, product_stock, product_description, product_series) VALUES  
('Wildflower Basin', 65.00, '/images/RBC_wildflower.png',10, 'A wide, rugged vase with uneven edges and a textured finish, perfect for loose floral arrangements.', 'Rustic Bloom'),  
('Meadow Hearth', 50.00, '/images/RBC_meadow.png',1, 'A stout, earthy vase with a raw glaze and an imperfect shape, capturing the beauty of nature’s unpredictability.', 'Rustic Bloom'),  
('Valley Drift Table', 80.00, '/images/RBC_valley.png',15, 'A broad, shallow vase with a rugged matte glaze and asymmetrical form, a striking centerpiece for any room.', 'Rustic Bloom'),
('Ashen Sauce', 40.00, '/images/EA_ashen.png',16, 'A hand-thrown sauce jar with a speckled grey glaze and an organic texture, ideal for serving sauces or dressings.','Earth & Ash'),  
('Earthen', 60.00, '/images/EA_earthen.png',13, 'A rustic bowl with a deep, earthy tone and a smooth interior, perfect for hearty meals or salads.', 'Earth & Ash'),  
('Slate Horizon', 85.00, '/images/EA_slate.png',15, 'A tall vase with a gradient of grey tones and a raw, unglazed base, blending elegance with nature.', 'Earth & Ash');

INSERT INTO categories (category_name, user_id) VALUES
("vase",1),
("bowl",1),
("jar",1);

INSERT INTO product_category (category_id,product_id) VALUES
(1,1),(1,2),(1,3),(3,4),(2,5),(1,6);

INSERT INTO promo_code (promo_code, start_date, end_date, promo_limit, promo_type, discount_rate)
VALUES
('WELCOME10', '2025-01-01 00:00:00', '2025-12-31 23:59:59', 1000, 'one-time', 0.1),
('NEWYEAR25', '2025-01-01 00:00:00', '2025-01-31 23:59:59', 500, 'multiple', 0.25),
('SPRINGSALE', '2025-03-01 00:00:00', '2025-03-31 23:59:59', 300, 'multiple', 0.30),
('SUMMERFUN', '2025-06-01 00:00:00', '2025-06-30 23:59:59', 200, 'one-time', 0.15),
('FALLDEAL', '2025-09-01 00:00:00', '2025-09-30 23:59:59', 150, 'multiple', 0.20),
('WINTER20', '2025-12-01 00:00:00', '2025-12-31 23:59:59', 100, 'one-time', 0.20),
('FLASHSALE', '2025-07-15 00:00:00', '2025-07-15 23:59:59', 50, 'one-time', 0.30),
('EXCLUSIVE5', '2025-05-01 00:00:00', '2025-05-15 23:59:59', 500, 'multiple', 0.05),
('HOLIDAY30', '2025-12-20 00:00:00', '2025-12-25 23:59:59', 300, 'multiple', 0.30),
('CLEARANCE', '2025-11-01 00:00:00', '2025-11-30 23:59:59', 250, 'one-time', 0.25);


-- Inserting product dimensions for all products
INSERT INTO product_dimension (pd_height, pd_width, pd_depth, pd_diameter, pd_circumference, product_id)
VALUES
    -- Wildflower Basin (Wide, rugged vase)
    (15.0, 12.0, 12.0, NULL, NULL, 1),  -- Height, width, depth for a broad shape, no diameter or circumference needed

    -- Meadow Hearth (Stout, earthy vase)
    (10.0, 10.0, 10.0, NULL, NULL, 2),  -- A stout, earthy vase with equal height, width, and depth

    -- Valley Drift (Broad, shallow vase)
    (8.0, 20.0, 20.0, NULL, NULL, 3),  -- Broad, shallow vase, height is smaller than width and depth

    -- Ashen Sauce (Cylindrical saucer jar)
    (14.0, NULL, NULL, 8.0, NULL, 4),  -- Cylindrical jar with height and diameter

    -- Earthen (Rustic bowl)
    (6.0, 15.0, 15.0, NULL, NULL, 5),  -- Rustic bowl, height and width/depth are equal

    -- Slate Horizon (Tall vase)
    (20.0, 10.0, 10.0, NULL, NULL, 6);  -- Tall vase with height greater than width and depth
