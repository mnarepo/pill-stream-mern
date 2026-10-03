# Pill Stream — Online Pharmacy Management System using MERN Stack

## Abstract

Pill Stream is an online pharmacy management and medicine ordering system designed for BISMILLAH Pharmacy. The project addresses the limitations of manual pharmacy shopping, where customers must physically visit the store, ask for product availability, and wait for manual billing. Pill Stream allows customers to browse medicines, search products, view categories, add items to cart, upload prescriptions where required, and place orders online.

The admin side enables pharmacy staff to manage medicines, categories, customers, orders, payment status, prescription images, contact messages, and sales reports. The system is implemented using the MERN stack: MongoDB for database storage, Express.js and Node.js for REST APIs, and React.js for the frontend interface. JWT authentication and role-based authorization protect customer and admin modules.

## Chapter 1: Introduction

### Background

Pharmacies commonly manage medicine sales, customer requests, inventory, and order records manually or through basic desktop systems. As customers increasingly expect online services, pharmacies require modern web applications that provide medicine browsing, order placement, and administrative control.

### Problem Statement

Manual pharmacy shopping creates problems such as limited product visibility, slow customer service, manual stock checking, paper-based order records, and lack of centralized sales reporting. Customers cannot easily search medicines or place orders remotely.

### Existing System

The original Pill Stream project was built using PHP, MySQL, HTML, CSS, Bootstrap, jQuery, and AdminLTE. It supported product listing, categories, registration, login, cart, checkout, admin dashboard, product management, user management, and sales reporting.

### Proposed System

The proposed system rebuilds Pill Stream using the MERN stack. It improves the old application with JWT authentication, MongoDB schemas, role-based access, modern React UI, image upload, prescription upload structure, order status tracking, payment status tracking, stock validation, admin reporting, and clean documentation.

### Project Scope

The project covers an online pharmacy demo system for academic/FYP use. It includes public medicine browsing, customer ordering, admin management, and reporting. It does not provide medical advice or legally validate prescriptions.

### Objectives

- Provide a responsive online medicine store.
- Enable secure customer registration and login.
- Allow customers to browse, search, filter, and order medicines.
- Add prescription upload support for medicines that require prescription.
- Enable admin management of categories, products, users, orders, and messages.
- Provide sales and dashboard reports.
- Use maintainable MERN stack architecture.

### Benefits

- Reduces manual order handling.
- Improves customer access to medicine information.
- Centralizes product and order data.
- Gives admin better inventory and sales visibility.
- Provides a professional final year project structure.

## Chapter 2: Requirement Analysis

### Functional Requirements

- Customer registration and login.
- Product/category browsing.
- Product search and filtering.
- Product detail viewing.
- Cart add/update/remove/clear.
- Checkout and order placement.
- Prescription upload when required.
- Customer order history and profile update.
- Admin dashboard and reporting.
- Admin product/category/user/order/contact management.

### Non-Functional Requirements

- Secure authentication using JWT.
- Password hashing using bcrypt.
- Responsive UI for desktop, tablet, and mobile.
- Maintainable folder structure.
- Reliable stock validation during checkout.
- Consistent API responses.
- Environment-based configuration.

### Hardware Requirements

- Development laptop or PC with at least 4 GB RAM.
- Internet connection for package installation.
- Local or cloud MongoDB server.

### Software Requirements

- Node.js 18 or later.
- npm.
- MongoDB Community Server or MongoDB Atlas.
- Modern browser.
- Code editor such as VS Code.

### User Roles

- Customer: browses products, manages cart, places orders, views own orders.
- Admin: manages products, categories, users, orders, reports, and contact messages.

### Constraints

- Online payment gateway is simulated only.
- Prescription review is structural/demo-based.
- The app does not provide medical advice.
- Legal pharmacy compliance must be validated before production use.

### Assumptions

- Admin enters correct medicine information.
- Customers provide correct shipping information.
- MongoDB is running before backend starts.
- Uploaded images are valid product/prescription images.

## Chapter 3: System Analysis

### Use Case Descriptions

Customer use cases include registration, login, browsing categories, searching products, viewing details, adding to cart, checkout, prescription upload, viewing order history, editing profile, and contacting pharmacy.

Admin use cases include login, dashboard viewing, product CRUD, category CRUD, user management, order status management, payment status management, reporting, invoice viewing, and contact message handling.

### Customer Module

The customer module provides account management, catalog browsing, cart operations, checkout, order history, order details, and profile editing.

### Admin Module

The admin module provides dashboard statistics, product management, category management, user management, order management, contact messages, and reports.

### Authentication Module

Authentication uses email/password login. Passwords are hashed using bcryptjs. JWT tokens are issued after registration or login and attached to protected API requests.

### Product Module

Products include medicine-specific fields such as dosage, manufacturer, expiry date, batch number, stock quantity, and requiresPrescription flag.

### Cart Module

The cart belongs to a logged-in customer. It stores product references, quantity, price at time, and calculated total amount.

### Order Module

Orders are created from cart items. The system validates product stock, reduces stock, saves order details, stores shipping information, and clears the cart.

### Report Module

The report module provides dashboard metrics, sales summary, monthly sales chart data, top-selling products, and invoice PDF generation.

## Chapter 4: System Design

### Architecture Design

The application follows a client-server architecture. React handles the user interface. Express.js exposes REST APIs. MongoDB stores data. Mongoose provides schema validation and data modeling.

### MERN Stack Architecture

- React frontend sends HTTP requests using Axios.
- Express routes forward requests to controllers.
- Controllers apply business logic.
- Mongoose models interact with MongoDB.
- Middleware handles authentication, authorization, validation, uploads, and errors.

### Database Design

The database includes users, categories, products, carts, orders, contactmessages, and prescriptions collections. Relationships are managed through ObjectId references.

### API Design

The API is organized by resource: auth, users, categories, products, cart, orders, contact, and reports. Responses follow a consistent success/error JSON format.

### Component Design

React components are separated into common, product, cart, and admin components. Pages are grouped as public, auth, customer, and admin pages.

### Security Design

Security includes JWT authentication, role-based admin authorization, password hashing, input validation, ObjectId validation, restricted image uploads, CORS configuration, and password exclusion from responses.

## Chapter 5: Implementation

### Backend Implementation

The backend is implemented with Express.js and Mongoose. It includes route files, controllers, models, middleware, utilities, seed scripts, and upload directories.

### Frontend Implementation

The frontend is implemented using React with Vite. It uses React Router for routing, Context API for auth/cart state, Axios for APIs, Bootstrap for styling, Toastify for notifications, and Recharts for dashboard charts.

### Authentication Implementation

Customers and admins login using the same endpoint. JWT is saved in localStorage and attached to requests through Axios interceptors.

### Cart Implementation

Cart APIs validate quantity and stock. The frontend cart page allows quantity updates and item removal.

### Order Implementation

Checkout creates multipart form data so prescription images can be uploaded. The backend converts cart items into order items and reduces product stock.

### Admin Dashboard Implementation

The admin dashboard displays users, products, categories, orders, sales, pending orders, delivered orders, low-stock items, recent orders, and monthly sales chart.

### Image Upload Implementation

Multer stores product images under `backend/src/uploads/products` and prescription images under `backend/src/uploads/prescriptions`. Uploads are restricted to jpg, jpeg, png, and webp.

### Report Implementation

Reports use MongoDB aggregation for sales, top products, and monthly sales. PDFKit generates invoice PDFs.

## Chapter 6: Testing

### Testing Strategy

Manual functional testing is performed across customer, admin, API, security, and UI flows. Backend routes are checked for expected success and error responses.

### Unit Testing Idea

Future unit tests can test controllers, middleware, validators, and utility functions separately.

### Integration Testing Idea

Integration tests can verify complete flows such as register-login-add-to-cart-checkout.

### Black-Box Testing

Black-box testing checks whether user actions produce expected results without inspecting internal code.

### Test Cases

See `Testing_Documentation.md` for detailed test cases.

### Results

The project includes code-level implementation for all required modules. Manual testing should be completed after installing dependencies and starting MongoDB locally.

## Chapter 7: Conclusion and Future Work

### Conclusion

Pill Stream successfully rebuilds an online pharmacy management system using the MERN stack. It provides customer e-commerce functionality and admin management functionality with a modern UI and structured backend.

### Limitations

- No real payment gateway.
- No real legal prescription validation.
- Email verification is simplified.
- No automated unit test suite included.

### Future Enhancements

- Payment gateway integration.
- Pharmacist prescription approval workflow.
- Email/SMS notifications.
- Advanced analytics and inventory forecasting.
- Automated Jest/Cypress testing.
- Deployment with CI/CD.

## References

- MongoDB Documentation
- Mongoose Documentation
- Express.js Documentation
- React Documentation
- Node.js Documentation
- JSON Web Token Documentation
- Bootstrap Documentation

## Appendix

### Installation Commands

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run seed
npm run dev
```

### Admin Credentials

```text
Email: admin@pillstream.com
Password: Admin@123
```

### Screenshot Placeholders

- Home page
- Product listing
- Product details
- Cart
- Checkout
- Admin dashboard
- Manage products
- Manage orders
- Reports
