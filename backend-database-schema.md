# Backend Database Schema for E-commerce Application

This document outlines the database schema design for the e-commerce application based on the frontend requirements.

## Database Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL, -- Hashed password
    ho_ten VARCHAR(255) NOT NULL,
    dia_chi TEXT,
    dien_thoai VARCHAR(20),
    vai_tro INT DEFAULT 0, -- 0: User, 1: Admin
    khoa INT DEFAULT 0, -- 0: Active, 1: Locked
    hinh VARCHAR(255), -- Avatar image URL
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Categories Table
```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_loai VARCHAR(255) NOT NULL, -- Category name
    slug VARCHAR(255) UNIQUE NOT NULL,
    hinh VARCHAR(255), -- Category image URL
    mo_ta TEXT, -- Description
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Products Table
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_sp VARCHAR(255) NOT NULL, -- Product name
    slug VARCHAR(255) UNIQUE NOT NULL,
    hinh VARCHAR(255) NOT NULL, -- Product image URL
    gia DECIMAL(10, 2) NOT NULL, -- Regular price
    gia_km DECIMAL(10, 2) NULL, -- Discount price
    mo_ta TEXT, -- Description
    so_luong INT DEFAULT 0, -- Stock quantity
    id_loai INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_loai) REFERENCES categories(id)
);
```

### 4. Product Images Table (for multiple images per product)
```sql
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sp INT NOT NULL,
    hinh VARCHAR(255) NOT NULL, -- Image URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sp) REFERENCES products(id) ON DELETE CASCADE
);
```

### 5. Product Reviews Table
```sql
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sp INT NOT NULL,
    id_user INT NOT NULL,
    rating INT NOT NULL, -- Rating from 1-5
    noi_dung TEXT, -- Review content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sp) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);
```

### 6. Orders Table
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    ho_ten VARCHAR(255) NOT NULL, -- Name
    dia_chi TEXT NOT NULL, -- Shipping address
    dien_thoai VARCHAR(20) NOT NULL, -- Phone
    email VARCHAR(255) NOT NULL,
    tong_tien DECIMAL(10, 2) NOT NULL, -- Total amount
    payment_method VARCHAR(50) NOT NULL, -- Payment method (cod, card, etc.)
    payment_status VARCHAR(50) DEFAULT 'pending', -- Payment status (pending, paid, failed)
    status VARCHAR(50) DEFAULT 'pending', -- Order status (pending, processing, shipped, delivered, cancelled)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id)
);
```

### 7. Order Details Table
```sql
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    id_sp INT NOT NULL,
    ten_sp VARCHAR(255) NOT NULL, -- Product name at time of order
    hinh VARCHAR(255) NOT NULL, -- Product image at time of order
    gia DECIMAL(10, 2) NOT NULL, -- Price at time of order
    so_luong INT NOT NULL, -- Quantity
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_order) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (id_sp) REFERENCES products(id)
);
```

### 8. Carts Table (if implementing server-side cart)
```sql
CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);
```

### 9. Cart Items Table (if implementing server-side cart)
```sql
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cart INT NOT NULL,
    id_sp INT NOT NULL,
    so_luong INT NOT NULL DEFAULT 1, -- Quantity
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cart) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (id_sp) REFERENCES products(id)
);
```

## Indexes for Optimization

```sql
-- Index for product searches
CREATE INDEX idx_products_ten_sp ON products(ten_sp);
CREATE INDEX idx_products_id_loai ON products(id_loai);

-- Index for order management
CREATE INDEX idx_orders_id_user ON orders(id_user);
CREATE INDEX idx_orders_status ON orders(status);

-- Index for cart management
CREATE INDEX idx_cart_items_id_cart ON cart_items(id_cart);
```

## Sample Data Seeding

Here's a simple example of how to seed some initial data for testing:

```sql
-- Seed Categories
INSERT INTO categories (ten_loai, slug, mo_ta) VALUES
('Điện thoại', 'dien-thoai', 'Các loại điện thoại di động'),
('Laptop', 'laptop', 'Máy tính xách tay các loại'),
('Máy tính bảng', 'may-tinh-bang', 'Các loại máy tính bảng'),
('Phụ kiện', 'phu-kien', 'Phụ kiện điện thoại và máy tính');

-- Seed Products
INSERT INTO products (ten_sp, slug, hinh, gia, gia_km, mo_ta, so_luong, id_loai) VALUES
('iPhone 15 Pro Max', 'iphone-15-pro-max', 'https://example.com/iphone15.jpg', 33990000, 32490000, 'Điện thoại iPhone 15 Pro Max mới nhất', 50, 1),
('Samsung Galaxy S23 Ultra', 'samsung-galaxy-s23-ultra', 'https://example.com/s23ultra.jpg', 29990000, 26990000, 'Điện thoại Samsung Galaxy S23 Ultra', 30, 1),
('MacBook Pro 16"', 'macbook-pro-16', 'https://example.com/macbook16.jpg', 58990000, NULL, 'MacBook Pro 16 inch với chip M3 Pro', 20, 2),
('iPad Pro 12.9"', 'ipad-pro-12-9', 'https://example.com/ipadpro.jpg', 30990000, 28990000, 'iPad Pro 12.9 inch với chip M2', 25, 3),
('AirPods Pro 2', 'airpods-pro-2', 'https://example.com/airpodspro2.jpg', 6790000, 5990000, 'Tai nghe Apple AirPods Pro 2', 100, 4);

-- Seed Admin User
INSERT INTO users (email, mat_khau, ho_ten, vai_tro, khoa) VALUES
('admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 1, 0);
```

## Notes on Implementation

1. Passwords should be hashed before storing in the database
2. Consider adding foreign key constraints with appropriate actions (CASCADE, SET NULL, etc.)
3. Use transactions for operations that modify multiple tables
4. Implement proper indexing for frequently queried columns
5. Consider using database migrations for version control of database schema 