USE tutu_store;


-- Sample users
INSERT INTO users (name, email, password)
VALUES
('Test User', 'test@tutustore.com', 'test123');


-- Sample products
INSERT INTO products (name, description, price, image)
VALUES
('Premium Laptop', 'High performance laptop for work and entertainment.', 50000.00, 'laptop.jpg'),

('Smartphone', 'Modern smartphone with powerful features.', 25000.00, 'smartphone.jpg'),

('Wireless Headphones', 'Comfortable wireless headphones with clear sound.', 3000.00, 'headphones.jpg'),

('Smart Watch', 'Smart watch with fitness and notification features.', 5000.00, 'smartwatch.jpg'),

('Mechanical Keyboard', 'Mechanical keyboard designed for productivity and gaming.', 4500.00, 'keyboard.jpg'),

('Wireless Mouse', 'Ergonomic wireless mouse for everyday use.', 1500.00, 'mouse.jpg');