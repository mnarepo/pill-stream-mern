# Pill Stream Backend

Express.js REST API for the Pill Stream online pharmacy system.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Main Scripts

- `npm run dev` — start backend using nodemon
- `npm start` — start backend using Node
- `npm run seed` — seed admin, categories, and demo products

## API Base URL

```text
http://localhost:5000/api
```

## Default Admin

```text
Email: admin@pillstream.com
Password: Admin@123
```

## Uploads

Product images are stored in `src/uploads/products`. Prescription images are stored in `src/uploads/prescriptions`.

Allowed file types: jpg, jpeg, png, webp. Maximum file size: 2 MB.
