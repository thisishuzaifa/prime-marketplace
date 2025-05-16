# Marketplace Backend

This is the backend service for the marketplace application, built with HonoJS, MySQL, and Clerk for authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration values.

4. Create the database:
```sql
CREATE DATABASE marketplace;
```

5. Run the database migrations:
```bash
mysql -u root -p marketplace < migrations/init.sql
```

## Development

Start the development server:
```bash
npm run dev
```

## Building

Build the application:
```bash
npm run build
```

## Running in Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Products

- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product

## Authentication

All protected routes require a valid Clerk session token in the Authorization header:
```
Authorization: Bearer <session_token>
``` 