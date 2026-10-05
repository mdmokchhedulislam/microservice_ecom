# MERN E-Commerce Microservices

A practice e-commerce application built with **MERN Stack + Microservices Architecture**.

The project is designed to understand how a traditional MERN application can be separated into independent backend services.

---

## 📌 Project Overview

This project contains:

* React frontend
* Node.js + Express backend services
* MongoDB databases
* JWT authentication
* Product management
* Cart management
* Order management
* Microservices communication using REST APIs

### Current Architecture

```text
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │      :5173           │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │ User Service │ │Product Service│ │ Order Service│
      │    :5001     │ │    :5002     │ │    :5003     │
      └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
             │                │                │
             ▼                ▼                ▼
       MongoDB            MongoDB            MongoDB
     ecommerce_users  ecommerce_products  ecommerce_orders
```

---

# 📁 Project Structure

```text
ecommerce-project/
│
├── ecommerce-backend/
│   │
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   └── db.js
│   │   │   ├── controllers/
│   │   │   │   └── userController.js
│   │   │   ├── models/
│   │   │   │   └── User.js
│   │   │   ├── routes/
│   │   │   │   └── userRoutes.js
│   │   │   ├── middleware/
│   │   │   │   └── authMiddleware.js
│   │   │   └── server.js
│   │   ├── .env
│   │   ├── .gitignore
│   │   └── package.json
│   │
│   ├── product-service/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   └── db.js
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   │   └── Product.js
│   │   │   ├── routes/
│   │   │   └── server.js
│   │   ├── .env
│   │   └── package.json
│   │
│   └── order-service/
│       ├── src/
│       │   ├── config/
│       │   │   └── db.js
│       │   ├── controllers/
│       │   │   └── orderController.js
│       │   ├── models/
│       │   │   └── Order.js
│       │   ├── routes/
│       │   │   └── orderRoutes.js
│       │   ├── services/
│       │   │   ├── userService.js
│       │   │   └── productService.js
│       │   └── server.js
│       ├── .env
│       └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetails.jsx
    │   │   ├── Cart.jsx
    │   │   └── Orders.jsx
    │   ├── services/
    │   │   ├── userApi.js
    │   │   ├── productApi.js
    │   │   └── orderApi.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── .gitignore
```

---

# 🛠️ Technologies

## Frontend

* React
* Vite
* Axios
* React Router
* CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Axios
* CORS

## Architecture

* Microservices
* REST API
* Service-to-Service Communication

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

```bash
cd ecommerce-project
```

---

# 🗄️ MongoDB

Make sure MongoDB is running locally.

Default MongoDB URL:

```text
mongodb://localhost:27017
```

The project uses three separate databases.

```text
ecommerce_users
ecommerce_products
ecommerce_orders
```

This separation represents independent databases for each microservice.

---

# 👤 User Service

## Port

```text
5001
```

## Environment Variables

Create:

```text
user-service/.env
```

```env
PORT=5001

MONGO_URI=mongodb://localhost:27017/ecommerce_users

JWT_SECRET=your_super_secret_key_change_this

JWT_EXPIRES_IN=1d
```

## Install Dependencies

```bash
cd ecommerce-backend/user-service
npm install
```

## Start Development Server

```bash
npm run dev
```

Expected:

```text
User Service running on port 5001
```

---

# 📦 Product Service

## Port

```text
5002
```

## Environment Variables

Create:

```text
product-service/.env
```

```env
PORT=5002

MONGO_URI=mongodb://localhost:27017/ecommerce_products
```

## Install Dependencies

```bash
cd ecommerce-backend/product-service
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# 🛒 Order Service

## Port

```text
5003
```

## Environment Variables

Create:

```text
order-service/.env
```

```env
PORT=5003

MONGO_URI=mongodb://localhost:27017/ecommerce_orders

USER_SERVICE_URL=http://localhost:5001

PRODUCT_SERVICE_URL=http://localhost:5002
```

## Install Dependencies

```bash
cd ecommerce-backend/order-service
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# 🌐 Frontend

Go to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

The application uses JWT authentication.

### Login Flow

```text
User
 │
 ▼
React Frontend
 │
 │ POST /api/users/login
 ▼
User Service
 │
 ▼
MongoDB
 │
 ▼
JWT Token
 │
 ▼
React
 │
 ▼
localStorage
```

The token is stored in:

```text
localStorage
```

For protected APIs:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 👤 User Service API

## Health Check

```http
GET /health
```

Example:

```text
http://localhost:5001/health
```

---

## Register

```http
POST /api/users/register
```

Request:

```json
{
  "name": "Mokchhedul",
  "email": "mokchhedul@gmail.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/users/login
```

Request:

```json
{
  "email": "mokchhedul@gmail.com",
  "password": "123456"
}
```

---

## Get Profile

```http
GET /api/users/profile
```

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Get User

```http
GET /api/users/:id
```

Example:

```text
GET /api/users/6ac389e284f04e4a41bdd898
```

---

# 📦 Product Service API

## Health Check

```http
GET /health
```

---

## Create Product

```http
POST /api/products
```

Example:

```json
{
  "name": "iPhone 17",
  "description": "Apple smartphone",
  "price": 120000,
  "stock": 10,
  "category": "Electronics"
}
```

---

## Get Products

```http
GET /api/products
```

---

## Get Product

```http
GET /api/products/:id
```

---

## Update Product

```http
PUT /api/products/:id
```

---

## Update Stock

```http
PUT /api/products/:id/stock
```

Request:

```json
{
  "quantity": 2
}
```

This decreases the available stock.

---

## Delete Product

```http
DELETE /api/products/:id
```

The application uses soft delete by setting:

```text
isActive = false
```

---

# 🛒 Order Service API

## Health Check

```http
GET /health
```

---

## Create Order

```http
POST /api/orders
```

Request:

```json
{
  "userId": "6ac389e284f04e4a41bdd898",
  "items": [
    {
      "productId": "PRODUCT_ID",
      "quantity": 2
    }
  ]
}
```

Order Service will:

```text
1. Validate user
        ↓
2. Get product information
        ↓
3. Check product stock
        ↓
4. Calculate subtotal
        ↓
5. Calculate total amount
        ↓
6. Reduce product stock
        ↓
7. Create order
        ↓
8. Return order
```

---

## Get User Orders

```http
GET /api/orders/user/:userId
```

Example:

```text
GET /api/orders/user/6ac389e284f04e4a41bdd898
```

Response:

```json
{
  "orders": [
    {
      "_id": "ORDER_ID",
      "userId": "6ac389e284f04e4a41bdd898",
      "items": [
        {
          "productId": "PRODUCT_ID",
          "name": "iPhone 17",
          "price": 120000,
          "quantity": 2,
          "subtotal": 240000
        }
      ],
      "totalAmount": 240000,
      "status": "pending"
    }
  ]
}
```

---

# 🔄 Microservice Communication

Order Service communicates with User and Product Services.

```text
                 Order Service
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   User Service            Product Service
      :5001                     :5002
          │                       │
          ▼                       ▼
    User MongoDB           Product MongoDB
```

For example, when creating an order:

```text
POST /api/orders
        │
        ▼
Order Service
        │
        ├── GET User Service
        │
        ├── GET Product Service
        │
        ├── PUT Product Stock
        │
        └── Create Order
```

---

# 🧪 Testing

Recommended testing order:

## 1. Check User Service

```text
GET http://localhost:5001/health
```

## 2. Register User

```text
POST http://localhost:5001/api/users/register
```

## 3. Login

```text
POST http://localhost:5001/api/users/login
```

Copy the JWT token.

## 4. Get Profile

```text
GET http://localhost:5001/api/users/profile
```

Add:

```http
Authorization: Bearer <TOKEN>
```

## 5. Create Product

```text
POST http://localhost:5002/api/products
```

## 6. Get Products

```text
GET http://localhost:5002/api/products
```

## 7. Create Order

```text
POST http://localhost:5003/api/orders
```

## 8. Get Orders

```text
GET http://localhost:5003/api/orders/user/<USER_ID>
```

---

# ⚠️ Current Architecture Limitation

Currently the React frontend communicates directly with all three services:

```text
React
 ├── User Service
 ├── Product Service
 └── Order Service
```

This is useful for learning but is not the ideal production architecture.

A production-style architecture should introduce an API Gateway.

---

# 🚪 Next Step: API Gateway

Target architecture:

```text
                    ┌─────────────────┐
                    │ React Frontend  │
                    │     :5173       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   API Gateway   │
                    │      :5000      │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       User Service    Product Service   Order Service
          :5001             :5002             :5003
```

Gateway routes:

```text
/api/users     → User Service
/api/products  → Product Service
/api/orders    → Order Service
```

After implementing the gateway, frontend should call only:

```text
http://localhost:5000
```

instead of calling each service directly.

---

# 📋 Development Roadmap

## Phase 1 — Backend ✅

* [x] User Service
* [x] User registration
* [x] User login
* [x] JWT authentication
* [x] User profile
* [x] Product Service
* [x] Product CRUD
* [x] Stock management
* [x] Order Service
* [x] Create order
* [x] Get user orders
* [x] Service-to-service communication

---

## Phase 2 — React Frontend ✅

* [x] React + Vite
* [x] React Router
* [x] Login
* [x] Registration
* [x] Product listing
* [x] Product details
* [x] Cart
* [x] Checkout
* [x] My Orders
* [x] JWT stored in localStorage

---

## Phase 3 — API Gateway 🔜

* [ ] Create API Gateway
* [ ] Route `/api/users`
* [ ] Route `/api/products`
* [ ] Route `/api/orders`
* [ ] Centralized CORS
* [ ] Request logging
* [ ] Authentication middleware
* [ ] Rate limiting
* [ ] Error handling
* [ ] Remove direct frontend-to-service communication

---

## Phase 4 — Production Microservices Features

* [ ] Dockerize every service
* [ ] Docker Compose
* [ ] Internal service networking
* [ ] Health checks
* [ ] Graceful shutdown
* [ ] Centralized configuration
* [ ] Structured logging
* [ ] API versioning
* [ ] Service authentication
* [ ] Retry mechanism
* [ ] Timeout handling
* [ ] Circuit breaker

---

## Phase 5 — Order Reliability

Current order flow has a potential consistency problem:

```text
Reduce Product Stock
        ↓
Create Order
```

If stock reduction succeeds but order creation fails, stock has already been reduced.

Production solution:

```text
Saga Pattern
```

Possible architecture:

```text
Order Service
      │
      ▼
Message Broker
      │
      ├── Product Service
      │
      ├── Payment Service
      │
      └── Notification Service
```

Possible technologies:

* RabbitMQ
* Apache Kafka

---

# 💳 Future Services

The application can later be expanded with:

```text
User Service
Product Service
Order Service
Payment Service
Inventory Service
Notification Service
Review Service
Cart Service
```

Target architecture:

```text
                         API Gateway
                              │
        ┌─────────────┬───────┼────────┬──────────────┐
        │             │       │        │              │
        ▼             ▼       ▼        ▼              ▼
      User         Product   Order   Payment      Inventory
     Service       Service  Service  Service       Service
        │             │       │        │              │
        └─────────────┴───────┴────────┴──────────────┘
                              │
                         Message Broker
                         RabbitMQ/Kafka
```

---

# 🐳 Future Docker Architecture

Each service should eventually have its own Docker image:

```text
user-service
product-service
order-service
api-gateway
frontend
```

Example:

```text
Docker Compose
│
├── frontend
├── api-gateway
├── user-service
├── product-service
├── order-service
├── mongodb-user
├── mongodb-product
└── mongodb-order
```

---

# ☸️ Future Kubernetes Architecture

After Docker Compose, the next learning step can be Kubernetes.

```text
Kubernetes Cluster
│
├── Frontend Deployment
├── API Gateway Deployment
├── User Service Deployment
├── Product Service Deployment
├── Order Service Deployment
│
├── Services
├── ConfigMaps
├── Secrets
├── HPA
├── Ingress
└── RBAC
```

Later:

```text
Kubernetes
   │
   ├── Prometheus
   ├── Grafana
   ├── Loki
   └── OpenTelemetry
```

---

# 📊 Observability Roadmap

Production observability:

```text
Application
    │
    ├── Metrics
    │      └── Prometheus
    │
    ├── Logs
    │      └── Loki
    │
    └── Traces
           └── OpenTelemetry
```

Grafana can then visualize:

* Request rate
* Error rate
* Response latency
* CPU
* Memory
* Order creation rate
* Product API latency
* Service failures

---

# 🔐 Security Roadmap

Future security improvements:

* [ ] HTTPS
* [ ] Secure JWT handling
* [ ] Refresh tokens
* [ ] Password policy
* [ ] Helmet
* [ ] Rate limiting
* [ ] Input validation
* [ ] MongoDB security
* [ ] API Gateway authentication
* [ ] Service-to-service authentication
* [ ] Secrets management
* [ ] Container security scanning

---

# 🚀 DevOps Roadmap

After the application is complete:

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ├── Lint
   ├── Test
   ├── Security Scan
   ├── Docker Build
   ├── Image Scan
   └── Push Image
           │
           ▼
       Container Registry
           │
           ▼
       Deployment
```

Later:

```text
GitHub Actions
      │
      ▼
Container Registry
      │
      ▼
Kubernetes
      │
      ▼
Argo CD
```

---

# 🎯 Learning Objectives

This project is intended to provide practical understanding of:

* MERN Stack
* REST API
* JWT Authentication
* MongoDB
* Microservices
* Service-to-service communication
* API Gateway
* Docker
* Docker Compose
* Kubernetes
* CI/CD
* Observability
* Distributed systems
* Event-driven architecture
* Saga Pattern
* Production DevOps

---

# 📝 Current Status

### Completed

```text
✅ User Service
✅ Product Service
✅ Order Service
✅ MongoDB integration
✅ JWT authentication
✅ React frontend
✅ Product browsing
✅ Cart
✅ Checkout
✅ Order creation
✅ Order history
```

### Next Immediate Task

```text
1. Build API Gateway
2. Move frontend API calls to Gateway
3. Add centralized authentication
4. Add rate limiting
5. Dockerize all services
6. Create Docker Compose
7. Add monitoring
8. Deploy to Kubernetes
9. Add CI/CD
10. Add Argo CD
```

---

# 👨‍💻 Author

**MD Mokchhedul Islam**

DevOps Engineer | Cloud & Automation Enthusiast | CI/CD & Infrastructure Specialist

```
```
