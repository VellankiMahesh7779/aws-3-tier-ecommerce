# Day 2 — Complete Frontend

## 🎯 Goal

Complete the frontend of the 3-Tier AWS E-Commerce application.

## 📁 Day 2 Files

application/frontend/
├── cart.html
├── login.html
├── register.html
├── orders.html
├── css/
│   └── style.css
└── js/
    ├── cart.js
    ├── auth.js
    └── orders.js

## 🛒 Shopping Cart

Created `cart.html` and `cart.js`.

### Features

- Display products added to cart
- Increase quantity
- Decrease quantity
- Remove products
- Calculate subtotal
- Calculate total
- Display empty cart message
- Checkout button

### Cart Flow

Product Details
      ↓
Add to Cart
      ↓
localStorage
      ↓
Cart Page
      ↓
Quantity / Remove
      ↓
Subtotal & Total

For Day 2, cart data is stored in browser `localStorage`.

## 🔐 Login

Created `login.html` with:

- Email field
- Password field
- Required-field validation
- Login button

The real login API will be connected on Day 3.

Frontend flow:

Login Form
    ↓
Validation
    ↓
Flask API
    ↓
MySQL

## 📝 Registration

Created `register.html` with:

- Full Name
- Email
- Password
- Confirm Password

Added validation for:

- Required fields
- Password confirmation

Real user registration will be connected to Flask and MySQL on Day 3.

## 📦 Orders

Created `orders.html` and `orders.js`.

Displayed sample order information:

- Order ID
- Order date
- Order status
- Products
- Quantity
- Total price

Real order data will be retrieved from MySQL after the backend is implemented.

## 🧪 Frontend Testing

Tested the complete frontend flow:

Home
 ↓
Products
 ↓
Search
 ↓
Product Details
 ↓
Add to Cart
 ↓
Cart
 ↓
Quantity / Remove
 ↓
Orders

Also tested:

- Login form
- Registration validation
- Cart calculations
- Empty cart
- Sample orders
- Navigation between pages

## 🏗️ Current Application Flow

Frontend
   │
   ├── Home
   ├── Products
   ├── Product Details
   ├── Cart
   ├── Login
   ├── Register
   └── Orders
            │
            ↓
       localStorage

The application is currently frontend-only.

## 🚀 Day 3

Next we will build the backend and database:

Frontend
    ↓
Flask REST API
    ↓
MySQL Database

### Day 3 Topics

- Flask application
- REST APIs
- User authentication
- Product APIs
- Order APIs
- MySQL database
- Database schema
- Seed data
- Connect frontend with backend

## ✅ Day 2 Result

- ✅ Shopping cart completed
- ✅ Quantity management added
- ✅ Remove functionality added
- ✅ Subtotal and total added
- ✅ Login page created
- ✅ Registration page created
- ✅ Form validation added
- ✅ Orders page created
- ✅ Frontend flow tested

