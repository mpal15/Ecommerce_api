
# Ecommerce_api

A project of ecommerce.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Requirements

Make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
Navigate to the project directory:

bash
Copy code

Install dependencies:
   ```base
   npm install
bash
Copy code
npm install
Configuration
Create a .env file in the root of your project and add the following configuration:

dotenv
Copy code
# Replace with your MongoDB connection string
MONGODB_URL=mongodb://localhost:27017/your-database

# Replace with a secret key for JWT
jwtsecret=your-secret-key
Running the Project
Start your MongoDB server.
# Replace with PORT
Port = your Port
Run the Node.js application:

bash
Copy code
npm start
This will start the server at http://localhost:8000 by default.

API Endpoints
POST /api/createProduct
Create a new product.

Request:

json
Copy code
{
  "title": "Product Title",
  "description": "Product Description",
  "price": 20.99,
  "availability": "In Stock",
  "category": "Electronics"
}
Response:

json
Copy code
{
  "productId": "your-product-id",
  "title": "Product Title",
  "description": "Product Description",
  "price": 20.99,
  "availability": "In Stock",
  "category": "Electronics"
}
POST /api/createCart
Create a new cart.

Request:

json
Copy code
{
  "productId": "your-product-id",
  "quantity": 2
}
Response:

json
Copy code
{
  "orderId": "your-order-id",
  "orderPrice": 41.98,
  "customer": "your-user-id",
  "orderItems": [
    {
      "productId": "your-product-id",
      "quantity": 2,
      "totalPriceForItem": 41.98
    }
  ]
}
GET /api/getCart
Get the user's cart information.

Response:

json
Copy code
{
  "orderItems": [
    {
      "productId": "your-product-id",
      "quantity": 2,
      "totalPriceForItem": 41.98
    }
  ],
  "totalCartPrice": 41.98
}
PUT /api/updateCart
Update the quantity of a product in the cart.

Request:

json
Copy code
{
  "productId": "your-product-id",
  "quantity": 3
}
Response:

json
Copy code
{
  "orderItems": [
    {
      "productId": "your-product-id",
      "quantity": 3,
      "totalPriceForItem": 62.97
    }
  ],
  "totalCartPrice": 62.97
}
DELETE /api/removeCartItem/:productId
Remove a product from the cart.

Response:

json
Copy code
{
  "orderItems": [],
  "totalCartPrice": 0
}


