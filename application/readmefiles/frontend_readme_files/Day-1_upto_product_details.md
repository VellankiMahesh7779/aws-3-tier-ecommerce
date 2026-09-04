# AWS 3-Tier E-Commerce Application

A 3-tier e-commerce application that will eventually be deployed on AWS using services such as VPC, EC2, ALB, RDS, S3, CloudWatch, IAM, Route 53 and Auto Scaling.

The project is being developed step-by-step:

Frontend → Backend → Database → AWS Infrastructure

---

# 1. Project Structure

We first created the basic project structure:

aws-3-tier-ecommerce/
│
└── application/
    │
    ├── backend/
    │   ├── app.py
    │   ├── database.py
    │   ├── modules/
    │   │   ├── order.py
    │   │   ├── product.py
    │   │   └── user.py
    │   ├── requirements.txt
    │   └── routes/
    │       ├── auth.py
    │       ├── orders.py
    │       └── products.py
    │
    ├── database/
    │   ├── schema.sql
    │   └── seed.sql
    │
    └── frontend/
        ├── js/
        │   ├── auth.js
        │   ├── cart.js
        │   ├── main.js
        │   ├── orders.js
        │   └── products.js
        │
        ├── css/
        │   └── style.css
        │
        ├── images/
        │
        ├── index.html
        ├── products.html
        ├── product-details.html
        ├── cart.html
        ├── login.html
        ├── register.html
        └── orders.html

---

# 2. Development Approach

After creating the file structure, we did NOT immediately create AWS resources.

We started by building the frontend.

Development flow:

Project Structure
       ↓
Frontend HTML
       ↓
CSS Styling
       ↓
JavaScript
       ↓
Test Frontend Locally
       ↓
Backend
       ↓
Database
       ↓
Connect Frontend + Backend + Database
       ↓
Test Complete Application
       ↓
Deploy to AWS

This approach helps us understand the application before creating AWS infrastructure.

---

# 3. Frontend Development

The frontend is located at:

application/frontend/

We started by creating the homepage.

---

# 4. Homepage — index.html

File:

application/frontend/index.html

The homepage contains:

- Navigation bar
- AWS Shop logo
- Home link
- Products link
- Cart link
- Login link
- Hero section
- Shop Now button
- Featured products
- Footer

The basic page structure is:

HTML
 │
 ├── Header
 │    └── Navigation
 │
 ├── Hero Section
 │
 ├── Featured Products
 │
 └── Footer

The homepage also connects to the CSS file:

css/style.css

and JavaScript file:

js/main.js

---

# 5. CSS — style.css

File:

application/frontend/css/style.css

We created the styling for the application.

The CSS handles:

- Navigation bar
- Logo
- Navigation links
- Hero section
- Buttons
- Product cards
- Product layout
- Search box
- Product details
- Footer

Example relationship:

index.html
    |
    └── css/style.css
             |
             └── Page Styling

The homepage was successfully tested in the browser.

---

# 6. Local Web Server

To test the frontend, we used Python's built-in HTTP server.

From the project root:

cd ~/aws-3-tier-ecommerce

Run:

python3 -m http.server 8000

The browser can then access:

http://localhost:8000/application/frontend/index.html

The homepage loaded successfully.

---

# 7. Products Page — products.html

After the homepage, we created:

application/frontend/products.html

The Products page contains:

- Products heading
- Search box
- Search button
- Product container
- Navigation
- Footer

The important part is that the product cards are not manually written into the HTML.

Instead:

products.html
      |
      ▼
products.js
      |
      ▼
Product data
      |
      ▼
Product cards

---

# 8. Product JavaScript — products.js

File:

application/frontend/js/products.js

We created a JavaScript product array.

The initial products are:

1. Premium Laptop
2. Smartphone
3. Wireless Headphones
4. Smart Watch
5. Mechanical Keyboard
6. Wireless Mouse

Each product contains:

- id
- name
- price
- description

Example:

{
    id: 1,
    name: "Premium Laptop",
    price: 50000,
    description: "High-performance laptop for work and entertainment."
}

---

# 9. Dynamic Product Rendering

Instead of writing every product directly into HTML, JavaScript creates the product cards dynamically.

Flow:

products.js
     |
     ▼
products array
     |
     ▼
displayProducts()
     |
     ▼
Create product card
     |
     ▼
Display in products.html

This makes it easier to later replace the hardcoded data with data from the backend.

---

# 10. Product Search

We implemented product searching in:

application/frontend/js/products.js

The user can type a product name.

Example:

Search:

laptop

Result:

Premium Laptop

The current flow is:

User
 ↓
Search Box
 ↓
products.js
 ↓
Filter Products
 ↓
Display Results

Search also works while typing.

---

# 11. View Product Functionality

Each product contains:

View Product

button.

When clicked, JavaScript sends the product ID through the URL.

Example:

product-details.html?id=1

Another example:

product-details.html?id=3

The product ID allows the Product Details page to know which product the user selected.

Flow:

Products Page
     |
     | Click View Product
     ↓
product-details.html?id=1
     |
     ↓
Product Details JavaScript
     |
     ↓
Find Product
     |
     ↓
Display Product

---

# 12. Product Details Page

File:

application/frontend/product-details.html

We created this page to display information about the selected product.

It contains:

- Product name
- Product description
- Product price
- Quantity
- Add to Cart button
- Back to Products button

The page loads:

js/product-details.js

---

# 13. Product Details JavaScript

File:

application/frontend/js/product-details.js

This JavaScript:

1. Reads the product ID from the URL.
2. Finds the matching product.
3. Displays the product information.
4. Allows the user to select quantity.
5. Adds the product to the cart.

Example URL:

product-details.html?id=1

JavaScript reads:

id = 1

Then searches the product array:

products.find(...)

and displays the selected product.

---

# 14. Add to Cart

We implemented the first version of the Add to Cart functionality.

When the user clicks:

Add to Cart

the product is stored in browser localStorage.

Flow:

Product Details
      |
      ↓
Add to Cart
      |
      ↓
localStorage
      |
      ↓
Cart Data

Example stored data:

[
    {
        "id": 1,
        "name": "Premium Laptop",
        "price": 50000,
        "quantity": 1
    }
]

---

# 15. Why localStorage?

At this stage, the backend and database are not connected yet.

Therefore, localStorage is being used temporarily to test the shopping-cart functionality.

Current architecture:

Browser
   |
   ↓
JavaScript
   |
   ↓
localStorage

This will later change to:

Browser
   |
   ↓
JavaScript
   |
   ↓
Flask Backend
   |
   ↓
RDS MySQL

localStorage is therefore only part of the frontend development stage.

---

# 16. Frontend Testing

We tested the application using:

python3 -m http.server 8000

Homepage:

http://localhost:8000/application/frontend/index.html

Products:

http://localhost:8000/application/frontend/products.html

Product Details:

http://localhost:8000/application/frontend/product-details.html?id=1

The following were successfully tested:

- Homepage loading
- CSS loading
- Products page loading
- Product cards
- Product search
- View Product button
- Product details
- Quantity selection
- Add to Cart

---

# 17. HTTP 404 Issue We Solved

Initially, accessing:

http://localhost:8000/products.html

returned:

404 File not found

Reason:

The Python HTTP server was running from the project root:

~/aws-3-tier-ecommerce

but products.html is located at:

~/aws-3-tier-ecommerce/application/frontend/products.html

Therefore the correct URL from the project-root server is:

http://localhost:8000/application/frontend/products.html

This helped us understand that Python's HTTP server serves files relative to the directory from which it is started.

---

# 18. Current Frontend Flow

The frontend currently works like this:

                    HOME
                     |
                     ↓
                  PRODUCTS
                     |
                     ↓
               VIEW PRODUCT
                     |
                     ↓
             PRODUCT DETAILS
                     |
                     ↓
                SELECT QTY
                     |
                     ↓
                ADD TO CART
                     |
                     ↓
                localStorage

---

# 19. Current Frontend Files

The files we have worked on are:

frontend/
│
├── index.html
│       ↓
│   Homepage
│
├── products.html
│       ↓
│   Product listing
│
├── product-details.html
│       ↓
│   Selected product
│
├── css/
│   └── style.css
│       ↓
│   Application styling
│
└── js/
    ├── main.js
    │   ↓
    │   Common JavaScript
    │
    ├── products.js
    │   ↓
    │   Product rendering + search
    │
    └── product-details.js
        ↓
        Product details + cart

---

# 20. Current Project Status

Frontend:

[████████░░] In Progress

Backend:

[░░░░░░░░░░] Not Started

Database:

[░░░░░░░░░░] Not Started

AWS:

[░░░░░░░░░░] Not Started

---

# 21. What We Will Build Next

The next step is:

## Cart

Files:

application/frontend/cart.html

application/frontend/js/cart.js

The Cart will read the data stored in localStorage.

It will display:

- Product
- Price
- Quantity
- Subtotal
- Total
- Remove item
- Update quantity
- Checkout

Flow:

Product Details
      |
      ↓
Add to Cart
      |
      ↓
localStorage
      |
      ↓
cart.html
      |
      ↓
Display Cart
      |
      ↓
Calculate Total

---

# 22. Complete Development Roadmap

## Phase 1 — Frontend

Completed:

- Project structure
- Homepage
- CSS
- Products page
- Product JavaScript
- Product search
- Product details
- Add to Cart

Remaining:

- Cart
- Login
- Register
- Orders
- Complete frontend testing

---

## Phase 2 — Backend

Technology:

Python + Flask

We will create:

- Flask application
- REST APIs
- Authentication APIs
- Product APIs
- Cart APIs
- Order APIs
- Database connection

Architecture:

Frontend
    |
    ↓
Flask REST API
    |
    ↓
Database

---

# 23. Database

Database technology:

MySQL

Tables:

users
products
orders
order_items

Example:

users
├── id
├── name
├── email
└── password

products
├── id
├── name
├── price
├── description
└── stock

orders
├── id
├── user_id
├── total
└── status

order_items
├── id
├── order_id
├── product_id
└── quantity

---

# 24. Final Local Application

Before AWS, the complete local application will look like:

              USER
                |
                ↓
             FRONTEND
                |
                ↓
          Flask Backend
                |
                ↓
             MySQL
                |
                ↓
             Database

We will make sure this works completely before deploying it to AWS.

---

# 25. AWS Deployment Plan

Once the local application is complete, we will deploy it using AWS.

Final AWS architecture:

                         INTERNET
                            |
                            ↓
                       Route 53
                            |
                            ↓
                           ALB
                            |
                 +----------+----------+
                 |                     |
                 ↓                     ↓
               EC2-1                EC2-2
                 |                     |
                 +----------+----------+
                            |
                            ↓
                        RDS MySQL

                       +----------+
                       |    S3    |
                       +----------+

                     CloudWatch
                     Monitoring

---

# 26. AWS Services

## Networking

- VPC
- Subnets
- Internet Gateway
- NAT Gateway
- Route Tables
- Security Groups

## Compute

- EC2
- Auto Scaling

## Load Balancing

- Application Load Balancer

## Database

- RDS MySQL

## Storage

- S3

## Security

- IAM
- IAM Roles
- Security Groups
- ACM

## Monitoring

- CloudWatch
- CloudWatch Alarms

## DNS

- Route 53

---

# 27. Final Application Flow

The final production-style architecture will be:

User
 |
 ↓
Route 53
 |
 ↓
Application Load Balancer
 |
 +----------------+
 |                |
 ↓                ↓
EC2-1            EC2-2
 |                |
 +-------+--------+
         |
         ↓
      RDS MySQL

EC2
 |
 +----→ S3

EC2 / ALB / RDS
 |
 ↓
CloudWatch

IAM
 |
 ↓
Controls access to AWS resources

---

# 🎯 Project Objective

The purpose of this project is not just to create an e-commerce website.

The main goal is to demonstrate practical AWS and DevOps knowledge by building and deploying a real application.

Skills demonstrated:

- Linux
- HTML
- CSS
- JavaScript
- Python
- Flask
- MySQL
- Networking
- AWS VPC
- AWS EC2
- AWS ALB
- AWS RDS
- AWS S3
- AWS IAM
- AWS CloudWatch
- AWS Auto Scaling
- Route 53
- HTTPS
- High Availability
- 3-Tier Architecture

---

# 📌 Current Milestone

Completed today:

Project Structure
       ↓
index.html
       ↓
style.css
       ↓
products.html
       ↓
products.js
       ↓
Product Search
       ↓
product-details.html
       ↓
product-details.js
       ↓
Add to Cart
       ↓
localStorage

Next milestone:

Cart → Login/Register → Orders → Backend → MySQL