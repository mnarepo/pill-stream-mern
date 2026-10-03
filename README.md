# Pill Stream — Online Pharmacy Management System using MERN Stack

Pill Stream is a complete MERN stack online pharmacy and medicine e-commerce system for **BISMILLAH Pharmacy**. It includes a public medicine store, customer authentication, cart and checkout, prescription upload structure, admin dashboard, product/category/user/order management, reports, invoice generation, and complete FYP documentation.

## Features

- Customer registration, login, JWT authentication, profile editing
- Role-based access control for customer and admin
- Medicine category browsing, product search, filtering, sorting, pagination
- Product details with dosage, pack size, manufacturer, stock, expiry, batch number, and prescription flag
- Cart add/update/remove/clear operations with backend stock validation
- Checkout with shipping details, payment method, prescription upload when required
- Customer order history and order details
- Admin dashboard with totals, low-stock indicators, monthly sales chart data, recent orders
- Admin CRUD for products, categories, users, orders, and contact messages
- Reports: sales summary, top products, monthly sales, PDF invoice generation
- Safe upload support for JPG, JPEG, PNG, and WEBP files
- Complete documentation in the `documentation/` folder

## Tech Stack

**Frontend:** React, Vite, React Router DOM, Axios, Bootstrap, React Icons, React Toastify, Recharts  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, multer, express-validator, PDFKit, nodemailer  
**Database:** MongoDB

## Folder Structure

```text
pill-stream-mern/
├── backend/
├── frontend/
├── documentation/
├── package.json
├── README.md
└── .gitignore
```

## Installation

### 1. Install root dependencies and project dependencies

```bash
npm install
```

This runs `postinstall` and installs backend and frontend dependencies. If needed, run manually:

```bash
npm run install:all
```

### 2. Create backend environment file

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` if your MongoDB URI is different.

### 3. Create frontend environment file

```bash
cp frontend/.env.example frontend/.env
```

### 4. Seed database

Start MongoDB locally, then run:

```bash
npm run seed
```

### 5. Run full project

```bash
npm run dev
```

Backend runs on `http://localhost:5000` and frontend runs on `http://localhost:5173`.

## Admin Credentials

```text
Email: admin@pillstream.com
Password: Admin@123
```

Change this password before production use.

## API Summary

- `/api/auth` — register, login, profile, password reset helpers
- `/api/users` — customer profile and admin user management
- `/api/categories` — public categories and admin category CRUD
- `/api/products` — public catalog and admin product CRUD
- `/api/cart` — customer cart management
- `/api/orders` — customer checkout/order history and admin order management
- `/api/contact` — public contact form and admin message management
- `/api/reports` — dashboard, sales, top products, monthly sales, invoice PDF

## Screenshots Placeholder

Add screenshots here after running the app:

- Home page
- Product listing
- Cart
- Checkout
- Admin dashboard
- Manage products
- Manage orders
- Reports

## Future Improvements

- Online payment gateway integration
- Real email verification workflow
- Advanced inventory forecasting
- Pharmacist prescription review workflow
- SMS/WhatsApp order notifications
- Unit and integration test automation

## License

Academic/FYP demonstration project. Use responsibly and validate legal pharmacy requirements before real production deployment.
