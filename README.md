# novoSnack

Backend API for a snack shop management system built with Node.js, TypeScript, Express, and MongoDB following Clean Architecture principles.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Architecture:** Clean Architecture (Domain / Application / Infrastructure)

## Project Structure

```
novoSnack/
├── main.ts                         # App entry point (DI composition root)
└── src/
    ├── domain/                     # Business rules (no external dependencies)
    │   ├── entities/               # Order, User, Item, Category
    │   ├── value-objects/          # Price, Quantity
    │   └── errors/                 # Domain-specific error classes
    ├── application/                # Use cases and repository interfaces
    │   ├── use-cases/
    │   │   ├── auth/               # Login
    │   │   ├── order/              # CreateOrder, ListOrders, ChangeOrderStatus, CancelOrder
    │   │   ├── category/           # CreateCategory, ListCategories
    │   │   └── item/               # CreateItem, ListItems
    │   └── repositories/           # Interfaces (IOrderRepository, etc.)
    ├── infrastructure/             # Frameworks, DB, HTTP
    │   ├── http/
    │   │   ├── controllers/        # AuthController, OrderController, ItemController, CategoryController
    │   │   ├── middlewares/        # authenticate (JWT), errorHandler
    │   │   └── routes/             # Express router
    │   └── database/mongoose/
    │       ├── models/             # Mongoose schemas
    │       └── repositories/       # MongoDB implementations
    └── scripts/
        └── createAdminUser.ts      # Seed script for the admin user
```

## Prerequisites

- Node.js 18+
- Docker (recommended) or MongoDB 7 installed locally

## Setup

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd novoSnack
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/novoSnack
JWT_SECRET=replace_with_a_strong_secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

**With Docker (recommended):**

```bash
docker compose up -d
```

**Without Docker:** Make sure MongoDB is running locally on port `27017`.

### 4. Create the admin user

```bash
npm run seed
```

This creates the default admin account:

- **Email:** `admin_novo_snack@gmail.com`
- **Password:** `senha123novo`

> Change these credentials in `src/scripts/createAdminUser.ts` before running in any shared environment.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## API Endpoints

### Auth

| Method | Route    | Auth | Description                          |
| ------ | -------- | ---- | ------------------------------------ |
| POST   | `/login` | No   | Authenticate and receive a JWT token |

**Body:**

```json
{ "email": "admin_novo_snack@gmail.com", "password": "senha123novo" }
```

**Response:**

```json
{ "token": "<jwt>" }
```

---

### Orders

| Method | Route              | Auth | Description          |
| ------ | ------------------ | ---- | -------------------- |
| POST   | `/orders`          | Yes  | Create a new order   |
| GET    | `/orders`          | Yes  | List all orders      |
| PATCH  | `/orders/:orderId` | Yes  | Advance order status |
| DELETE | `/orders/:orderId` | Yes  | Cancel an order      |

**Order status flow:** `pending` → `in_progress` → `completed`

**POST /orders body:**

```json
{
  "customerId": "user-id",
  "orderItem": [{ "itemId": "item-id", "quantityItem": 2 }]
}
```

**PATCH /orders/:orderId body:**

```json
{ "newOrderStatus": "in_progress" }
```

---

### Items (menu)

| Method | Route    | Auth | Description         |
| ------ | -------- | ---- | ------------------- |
| POST   | `/items` | Yes  | Create a menu item  |
| GET    | `/items` | No   | List all menu items |

**POST /items body:**

```json
{
  "itemName": "X-Burguer",
  "itemDescription": "Classic burger",
  "itemPrice": 25.9,
  "itemIngredients": ["bread", "beef", "cheese"],
  "itemCategory": "category-id"
}
```

---

### Categories

| Method | Route         | Auth | Description         |
| ------ | ------------- | ---- | ------------------- |
| POST   | `/categories` | Yes  | Create a category   |
| GET    | `/categories` | No   | List all categories |

**POST /categories body:**

```json
{ "categoryName": "Burgers" }
```

---

## Authenticated Requests

Pass the token from `/login` in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Available Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start dev server with hot reload      |
| `npm run build` | Compile TypeScript to `dist/`         |
| `npm start`     | Run compiled app from `dist/`         |
| `npm run seed`  | Create the admin user in the database |
