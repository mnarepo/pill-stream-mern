# Software Requirement Specification (SRS)

## 1. Introduction

### Purpose

This SRS defines the requirements for Pill Stream, an online pharmacy management system built using the MERN stack.

### Scope

The system supports customer medicine browsing, cart, checkout, prescription upload, order tracking, and admin management of pharmacy data.

### Definitions

- MERN: MongoDB, Express.js, React.js, Node.js.
- JWT: JSON Web Token used for authentication.
- Admin: Pharmacy staff user with management permissions.
- Customer: Registered buyer/user of the pharmacy website.

### Intended Audience

This document is intended for students, developers, supervisors, testers, and project evaluators.

## 2. Overall Description

### Product Perspective

Pill Stream is a web-based client-server application. React is the client. Express and Node provide the server. MongoDB stores the data.

### Product Functions

- Register/login customers.
- Browse/search/filter products.
- Manage cart and checkout.
- Upload prescription image if required.
- Track orders.
- Admin manage products, categories, users, orders, messages, and reports.

### User Classes

- Guest user.
- Registered customer.
- Admin user.

### Operating Environment

- Browser: Chrome, Edge, Firefox.
- Backend: Node.js server.
- Database: MongoDB local or Atlas.

### Design Constraints

- Must use MERN stack.
- Must use JWT authentication.
- Must use role-based access control.
- Must not hard-code secrets.

## 3. Functional Requirements

| ID | Requirement Name | Description | Role | Priority | Input | Output |
|---|---|---|---|---|---|---|
| FR-01 | User Registration | Customer can create account. | Customer | High | name, email, password | user, token |
| FR-02 | User Login | Customer/admin can login. | Customer/Admin | High | email, password | user, token |
| FR-03 | View Products | User can view active products. | Guest/Customer | High | optional filters | product list |
| FR-04 | Search Products | User can search medicine by keyword. | Guest/Customer | High | search text | matching products |
| FR-05 | View Categories | User can view active categories. | Guest/Customer | Medium | none | category list |
| FR-06 | View Product Details | User can open medicine details. | Guest/Customer | High | slug | product details |
| FR-07 | Add to Cart | Customer can add medicine to cart. | Customer | High | productId, quantity | updated cart |
| FR-08 | Update Cart | Customer can update cart quantity. | Customer | High | productId, quantity | updated cart |
| FR-09 | Remove from Cart | Customer can remove cart item. | Customer | High | productId | updated cart |
| FR-10 | Checkout | Customer can place order from cart. | Customer | High | shipping, payment, prescription image | order |
| FR-11 | View Order History | Customer can view own orders. | Customer | Medium | none | orders list |
| FR-12 | Update Profile | Customer can update profile. | Customer | Medium | profile fields | updated user |
| FR-13 | Contact Pharmacy | User can submit contact message. | Guest/Customer | Medium | name, email, message | saved message |
| FR-14 | Admin Login | Admin can login to admin panel. | Admin | High | email, password | token, admin user |
| FR-15 | Admin Dashboard | Admin can view summary statistics. | Admin | High | none | dashboard data |
| FR-16 | Manage Products | Admin can add/edit/delete medicines. | Admin | High | product data/image | product record |
| FR-17 | Manage Categories | Admin can add/edit/delete categories. | Admin | High | category data | category record |
| FR-18 | Manage Users | Admin can view/update/delete users. | Admin | Medium | user fields | updated user |
| FR-19 | Manage Orders | Admin can view and update orders. | Admin | High | status/payment changes | updated order |
| FR-20 | Manage Reports | Admin can view sales/top/monthly reports. | Admin | Medium | date range | report data |
| FR-21 | View Contact Messages | Admin can read/update/delete messages. | Admin | Medium | status/delete action | updated message |

## 4. Non-Functional Requirements

### Security

Passwords must be hashed. JWT must protect private APIs. Admin APIs must require admin role. Uploaded files must be restricted by type and size.

### Usability

UI must be clean, responsive, and understandable for normal customers and pharmacy staff.

### Performance

Product listing supports pagination. Database queries use indexes for email, slug, and user order relationships.

### Reliability

Central error handling returns consistent JSON errors. Checkout validates stock before order creation.

### Maintainability

The project uses modular controllers, routes, models, middleware, components, pages, and API files.

### Scalability

The MERN architecture can be deployed to separate frontend, backend, and database services.

### Portability

The app can run locally or on cloud platforms such as Render, Railway, Vercel, Netlify, and MongoDB Atlas.

### Availability

Production availability depends on hosting provider uptime and MongoDB service availability.

## 5. External Interface Requirements

### User Interface

React pages for public website, authentication, customer portal, and admin panel.

### Hardware Interface

No special hardware is required except normal server/client machines.

### Software Interface

Frontend communicates with backend over REST APIs using Axios. Backend communicates with MongoDB using Mongoose.

### Communication Interface

HTTP/HTTPS REST API with JSON responses. File uploads use multipart/form-data.

## 6. System Features

- Medicine catalog.
- Cart and checkout.
- Prescription upload.
- Admin management.
- Reports and invoice PDF.

## 7. Database Requirements

MongoDB database named `pillstream` with collections: users, categories, products, carts, orders, contactmessages, prescriptions.

## 8. Security Requirements

- JWT authentication.
- Bcrypt password hashing.
- Admin middleware.
- ObjectId validation.
- Upload file type and size validation.
- Password removed from API responses.

## 9. Assumptions and Dependencies

- MongoDB is available.
- Node.js and npm are installed.
- Admin seeds the database before first demo.
- Email reset flow requires SMTP credentials.
