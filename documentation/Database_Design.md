# Database Design

## Database Name

`pillstream`

## Collections

- users
- categories
- products
- carts
- orders
- contactmessages
- prescriptions

## Collection Details

### users

Stores customer and admin accounts.

| Field | Type | Required | Description |
|---|---|---|---|
| name | String | Yes | User full name |
| email | String | Yes | Unique login email |
| password | String | Yes | Hashed password |
| phone | String | No | Contact phone |
| address | String | No | Address |
| city | String | No | City |
| role | String | Yes | customer or admin |
| isVerified | Boolean | No | Email/account verification flag |
| avatar | String | No | Avatar path/url |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

### categories

Stores medicine categories.

| Field | Type | Required | Description |
|---|---|---|---|
| name | String | Yes | Category name |
| slug | String | Yes | Unique URL slug |
| description | String | No | Category details |
| image | String | No | Image path/url |
| isActive | Boolean | Yes | Visibility flag |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

### products

Stores medicines/products.

| Field | Type | Required | Description |
|---|---|---|---|
| name | String | Yes | Product name |
| slug | String | Yes | Unique URL slug |
| category | ObjectId | Yes | Reference to categories |
| description | String | Yes | Product description |
| price | Number | Yes | Sale price |
| oldPrice | Number | No | Previous price |
| image | String | No | Product image |
| brand | String | No | Brand |
| dosage | String | No | Dosage info entered by admin |
| packSize | String | No | Pack size |
| stock | Number | Yes | Available quantity |
| requiresPrescription | Boolean | Yes | Prescription required flag |
| expiryDate | Date | No | Medicine expiry date |
| batchNumber | String | No | Batch number |
| manufacturer | String | No | Manufacturer |
| isActive | Boolean | Yes | Visibility flag |
| featured | Boolean | Yes | Featured on home page |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

### carts

Stores each customer's current cart.

| Field | Type | Required | Description |
|---|---|---|---|
| user | ObjectId | Yes | Reference to users |
| items.product | ObjectId | Yes | Reference to products |
| items.quantity | Number | Yes | Quantity |
| items.priceAtTime | Number | Yes | Price when added |
| totalAmount | Number | Yes | Calculated cart total |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

### orders

Stores customer orders.

| Field | Type | Required | Description |
|---|---|---|---|
| user | ObjectId | Yes | Reference to users |
| orderItems.product | ObjectId | Yes | Product reference |
| orderItems.name | String | Yes | Product name snapshot |
| orderItems.image | String | No | Product image snapshot |
| orderItems.quantity | Number | Yes | Ordered quantity |
| orderItems.price | Number | Yes | Price snapshot |
| shippingAddress | Object | Yes | Full shipping info |
| paymentMethod | String | Yes | COD/Card/Bank Transfer |
| paymentStatus | String | Yes | Pending/Paid/Failed/Refunded |
| orderStatus | String | Yes | Pending/Approved/Packed/Dispatched/Delivered/Cancelled |
| prescriptionImage | String | No | Prescription upload path |
| itemsPrice | Number | Yes | Items subtotal |
| deliveryFee | Number | Yes | Delivery fee |
| totalPrice | Number | Yes | Final amount |
| notes | String | No | Customer note |
| deliveredAt | Date | No | Delivery date |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

### contactmessages

Stores submitted contact queries.

| Field | Type | Required | Description |
|---|---|---|---|
| name | String | Yes | Sender name |
| email | String | Yes | Sender email |
| subject | String | Yes | Subject |
| message | String | Yes | Message body |
| status | String | Yes | New/Read/Replied |
| createdAt | Date | Auto | Creation date |

### prescriptions

Stores prescription image review records.

| Field | Type | Required | Description |
|---|---|---|---|
| user | ObjectId | Yes | Reference to users |
| image | String | Yes | Uploaded prescription image |
| status | String | Yes | Pending/Approved/Rejected |
| adminNote | String | No | Admin note |
| createdAt | Date | Auto | Creation date |
| updatedAt | Date | Auto | Update date |

## Relationships

- User to Cart: one user has one active cart.
- User to Order: one user can have many orders.
- Category to Product: one category can have many products.
- Product to Order Items: order items reference products while storing snapshot fields.
- User to Contact Messages: contact messages are not directly linked but include name/email.
- User to Prescription: one user can upload multiple prescription records.

## ERD Description

The user entity is central for authentication. Each customer has a cart and can place many orders. Products belong to categories. Orders contain embedded order items that reference products. Contact messages are separate records for admin review. Prescription records connect uploaded images to customers.

## Indexes

- users.email unique index.
- categories.slug unique index.
- products.slug unique index.
- products text index on name, description, brand, manufacturer.
- orders.user index.
- carts.user unique index.
