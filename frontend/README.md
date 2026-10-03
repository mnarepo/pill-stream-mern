# Pill Stream Frontend

React + Vite frontend for the Pill Stream online pharmacy system.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Main Routes

- `/` home
- `/products` product catalog
- `/cart` customer cart
- `/checkout` checkout
- `/my-orders` customer orders
- `/admin/dashboard` admin dashboard
- `/admin/products` product management
- `/admin/orders` order management
- `/admin/reports` reports

## Environment Variables

```text
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```
