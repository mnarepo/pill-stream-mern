# API Documentation

Base URL: `http://localhost:5000/api`

All successful responses use:

```json
{ "success": true, "message": "Operation successful", "data": {} }
```

All errors use:

```json
{ "success": false, "message": "Error message" }
```

Protected APIs require header:

```text
Authorization: Bearer <token>
```

## Auth APIs

### POST /api/auth/register

Access: Public  
Description: Registers a customer.

Request:

```json
{ "name": "Customer", "email": "customer@example.com", "password": "123456", "phone": "03000000000" }
```

Response:

```json
{ "success": true, "message": "Registration successful", "data": { "user": {}, "token": "jwt-token" } }
```

### POST /api/auth/login

Access: Public  
Description: Authenticates customer/admin.

Request:

```json
{ "email": "admin@pillstream.com", "password": "Admin@123" }
```

Response:

```json
{ "success": true, "message": "Login successful", "data": { "user": {}, "token": "jwt-token" } }
```

### GET /api/auth/me

Access: Protected  
Description: Returns logged-in user.

### POST /api/auth/logout

Access: Protected  
Description: Frontend logout helper.

### POST /api/auth/forgot-password

Access: Public  
Description: Sends reset email if SMTP is configured.

Request:

```json
{ "email": "customer@example.com" }
```

### POST /api/auth/reset-password

Access: Public  
Description: Resets password using token.

Request:

```json
{ "token": "reset-token", "password": "newpassword" }
```

## User APIs

### GET /api/users/profile

Access: Protected  
Description: Gets current user profile.

### PUT /api/users/profile

Access: Protected  
Description: Updates current profile.

Request:

```json
{ "name": "New Name", "phone": "03000000000", "city": "Lahore", "address": "Street address" }
```

### GET /api/users

Access: Admin  
Description: Lists users. Supports `search` query.

### GET /api/users/:id

Access: Admin  
Description: Gets a user by id.

### PUT /api/users/:id

Access: Admin  
Description: Updates user data or role.

### DELETE /api/users/:id

Access: Admin  
Description: Deletes user.

## Category APIs

### GET /api/categories

Access: Public  
Description: Lists active categories.

### GET /api/categories/admin/all

Access: Admin  
Description: Lists all categories for admin.

### GET /api/categories/:slug

Access: Public  
Description: Gets category by slug.

### POST /api/categories

Access: Admin  
Description: Creates category.

Request:

```json
{ "name": "Fever", "description": "Fever medicines", "isActive": true }
```

### PUT /api/categories/:id

Access: Admin  
Description: Updates category.

### DELETE /api/categories/:id

Access: Admin  
Description: Deletes or deactivates category.

## Product APIs

### GET /api/products

Access: Public  
Description: Lists products.

Query parameters: `search`, `category`, `minPrice`, `maxPrice`, `page`, `limit`, `sort`.

### GET /api/products/featured

Access: Public  
Description: Gets featured products.

### GET /api/products/:slug

Access: Public  
Description: Gets product details.

### GET /api/products/admin/all

Access: Admin  
Description: Lists all products.

### GET /api/products/admin/:id

Access: Admin  
Description: Gets product by id for edit page.

### POST /api/products

Access: Admin  
Description: Creates product with optional image upload.  
Content-Type: `multipart/form-data`

Fields: `name`, `category`, `description`, `price`, `oldPrice`, `image`, `brand`, `dosage`, `packSize`, `stock`, `requiresPrescription`, `expiryDate`, `batchNumber`, `manufacturer`, `isActive`, `featured`.

### PUT /api/products/:id

Access: Admin  
Description: Updates product with optional replacement image.

### DELETE /api/products/:id

Access: Admin  
Description: Deletes product.

## Cart APIs

### GET /api/cart

Access: Protected  
Description: Gets current user cart.

### POST /api/cart/add

Access: Protected  
Description: Adds product to cart.

Request:

```json
{ "productId": "mongo-id", "quantity": 1 }
```

### PUT /api/cart/update/:productId

Access: Protected  
Description: Updates item quantity.

Request:

```json
{ "quantity": 2 }
```

### DELETE /api/cart/remove/:productId

Access: Protected  
Description: Removes item from cart.

### DELETE /api/cart/clear

Access: Protected  
Description: Clears cart.

## Order APIs

### POST /api/orders

Access: Protected  
Description: Creates order from cart. Supports prescription upload.  
Content-Type: `multipart/form-data`

Fields: `fullName`, `phone`, `address`, `city`, `postalCode`, `paymentMethod`, `notes`, `prescriptionImage`.

### GET /api/orders/my-orders

Access: Protected  
Description: Lists logged-in customer's orders.

### GET /api/orders/:id

Access: Protected  
Description: Gets order details. Customer can only see own order. Admin can see all.

### GET /api/orders

Access: Admin  
Description: Lists all orders. Supports `status`, `startDate`, `endDate`, and `search`.

### PUT /api/orders/:id/status

Access: Admin  
Description: Updates order status.

Request:

```json
{ "orderStatus": "Approved" }
```

### PUT /api/orders/:id/payment-status

Access: Admin  
Description: Updates payment status.

Request:

```json
{ "paymentStatus": "Paid" }
```

### DELETE /api/orders/:id

Access: Admin  
Description: Cancels order and restocks items if applicable.

## Contact APIs

### POST /api/contact

Access: Public  
Description: Submits contact message.

Request:

```json
{ "name": "Ali", "email": "ali@example.com", "subject": "Order", "message": "Please help me with my order." }
```

### GET /api/contact

Access: Admin  
Description: Lists messages.

### PUT /api/contact/:id/status

Access: Admin  
Description: Updates message status.

Request:

```json
{ "status": "Read" }
```

### DELETE /api/contact/:id

Access: Admin  
Description: Deletes message.

## Report APIs

### GET /api/reports/dashboard

Access: Admin  
Description: Returns totals, sales, low stock products, and recent orders.

### GET /api/reports/sales

Access: Admin  
Description: Returns sales summary. Supports `startDate` and `endDate`.

### GET /api/reports/top-products

Access: Admin  
Description: Returns top-selling products.

### GET /api/reports/monthly-sales

Access: Admin  
Description: Returns monthly sales chart data.

### GET /api/reports/invoice/:orderId

Access: Admin or order owner  
Description: Returns invoice PDF.

## Common Error Example

```json
{ "success": false, "message": "Admin access required" }
```
