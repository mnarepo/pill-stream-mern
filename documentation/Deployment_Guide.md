# Deployment Guide

## Local Setup

### 1. Install Node.js

Install Node.js 18 or later from the official Node.js website.

### 2. Install MongoDB

Install MongoDB Community Server locally or create a MongoDB Atlas cluster.

### 3. Clone Project

```bash
git clone <repo-url>
cd pill-stream-mern
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Create Backend `.env`

```bash
cp .env.example .env
```

Example:

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pillstream
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 6. Run Backend

```bash
npm run dev
```

### 7. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 8. Create Frontend `.env`

```bash
cp .env.example .env
```

Example:

```text
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

### 9. Run Frontend

```bash
npm run dev
```

### 10. Seed Database

From backend folder:

```bash
npm run seed
```

Or from project root:

```bash
npm run seed
```

## Run Full Project from Root

From root folder:

```bash
npm install
npm run seed
npm run dev
```

## Production Deployment

### Backend Options

- Render
- Railway
- VPS

### Frontend Options

- Vercel
- Netlify
- Static hosting behind Nginx

### Database

Use MongoDB Atlas for production database.

## Backend Production Environment Variables

```text
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pillstream
JWT_SECRET=very_secure_long_secret
JWT_EXPIRES_IN=7d
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
```

## Frontend Production Environment Variables

```text
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_BACKEND_URL=https://your-backend-domain.com
```

## Common Errors and Fixes

### MongoDB Connection Issue

Problem: backend shows MongoDB connection failed.

Fix:

- Make sure MongoDB is running locally.
- Check `MONGO_URI`.
- For Atlas, whitelist your IP and verify username/password.

### CORS Issue

Problem: frontend cannot call backend due to CORS.

Fix:

- Set backend `CLIENT_URL` to frontend URL.
- Restart backend after changing `.env`.

### Image Upload Path Issue

Problem: uploaded images do not show.

Fix:

- Confirm backend serves `/uploads` statically.
- Confirm frontend `VITE_BACKEND_URL` is correct.
- Confirm uploaded file exists in `backend/src/uploads`.

### JWT Secret Issue

Problem: token invalid after restart/deployment.

Fix:

- Use one stable `JWT_SECRET` in production.
- Do not change JWT secret frequently.

### Admin Login Not Working

Fix:

- Run `npm run seed` in backend.
- Use `admin@pillstream.com` and `Admin@123`.

### Port Already in Use

Fix:

- Change `PORT` in backend `.env`.
- Update `VITE_API_BASE_URL` accordingly.

## Deployment Checklist

- Build frontend with `npm run build`.
- Set production environment variables.
- Use MongoDB Atlas.
- Use HTTPS domains.
- Change default admin password.
- Use secure JWT secret.
- Configure persistent storage for uploads or use cloud storage.
