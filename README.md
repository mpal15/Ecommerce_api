
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
   git clone (https://github.com/mpal15/Ecommerce_api.git)
Navigate to the project directory:

bash
Copy code

![Screenshot (103)](https://github.com/mpal15/Ecommerce_api/assets/62149463/237b36a9-eebd-445d-88cd-98b06015945d)
![Screenshot (104)](https://github.com/mpal15/Ecommerce_api/assets/62149463/0a2bd9d9-ec5e-40ae-ab4e-1933ace857d6)
![Screenshot (106)](https://github.com/mpal15/Ecommerce_api/assets/62149463/a25662a8-8d9a-4f7c-bb7c-761359f797e1)
![Screenshot (107)](https://github.com/mpal15/Ecommerce_api/assets/62149463/92af46bd-af03-4804-b2c0-39c657a74aa6)
![Screenshot (108)](https://github.com/mpal15/Ecommerce_api/assets/62149463/2740c1e7-1422-41fa-88f1-ae1190e4862b)
dependencies install:

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


