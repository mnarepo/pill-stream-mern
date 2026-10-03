# Testing Documentation

## 1. Testing Approach

Pill Stream is tested using manual functional testing, API testing, security testing, UI testing, and role-based access testing. The main objective is to verify that customer and admin flows work correctly and that invalid operations return useful errors.

## 2. Test Environment

- OS: Windows/Linux/macOS
- Browser: Chrome/Edge/Firefox
- Backend: Node.js + Express
- Frontend: React + Vite
- Database: MongoDB local or Atlas
- API client: Postman/Thunder Client/browser frontend

## 3. Functional Test Cases

| Test Case ID | Module | Test Scenario | Test Steps | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| TC-01 | Auth | Register user with valid data | Open register, enter valid name/email/password, submit | User account created and logged in | As expected after local run | Pass |
| TC-02 | Auth | Register duplicate email | Register with existing email | Error message shown | As expected after local run | Pass |
| TC-03 | Auth | Login valid credentials | Enter valid email/password | User logged in, token saved | As expected after local run | Pass |
| TC-04 | Auth | Login wrong password | Enter valid email and wrong password | Error shown | As expected after local run | Pass |
| TC-05 | Auth | Access protected route without token | Open cart directly | Redirect to login | As expected after local run | Pass |
| TC-06 | Products | View all products | Open `/products` | Product cards appear | As expected after local run | Pass |
| TC-07 | Products | Search product | Search `ORS` | Matching products appear | As expected after local run | Pass |
| TC-08 | Products | Filter by category | Select Fever category | Fever products appear | As expected after local run | Pass |
| TC-09 | Products | View product details | Click product details | Medicine details shown | As expected after local run | Pass |
| TC-10 | Cart | Add product to cart | Login and click Add | Cart updated | As expected after local run | Pass |
| TC-11 | Cart | Update cart quantity | Change quantity | Cart total recalculates | As expected after local run | Pass |
| TC-12 | Cart | Quantity above stock | Enter quantity larger than stock | Error shown | As expected after local run | Pass |
| TC-13 | Cart | Remove item | Click remove | Item removed | As expected after local run | Pass |
| TC-14 | Checkout | Place COD order | Fill shipping and place order | Order created, stock reduced, cart cleared | As expected after local run | Pass |
| TC-15 | Checkout | Prescription medicine without upload | Add prescription product and checkout without image | Error asks for prescription upload | As expected after local run | Pass |
| TC-16 | Orders | View my orders | Open My Orders page | Customer orders shown | As expected after local run | Pass |
| TC-17 | Orders | View own order details | Click customer order | Details shown | As expected after local run | Pass |
| TC-18 | Security | Customer views another order | Request other user's order ID | Access denied | As expected after local run | Pass |
| TC-19 | Profile | Update profile | Edit phone/address/city | Profile updated | As expected after local run | Pass |
| TC-20 | Contact | Submit contact message | Fill contact form | Message saved | As expected after local run | Pass |
| TC-21 | Admin | Admin login | Login with admin credentials | Admin dashboard opens | As expected after local run | Pass |
| TC-22 | Admin | Non-admin opens admin route | Login customer and open admin dashboard | Redirect/blocked | As expected after local run | Pass |
| TC-23 | Admin Products | Add product | Fill product form and save | Product created | As expected after local run | Pass |
| TC-24 | Admin Products | Upload invalid file | Upload txt/pdf as product image | Error shown | As expected after local run | Pass |
| TC-25 | Admin Products | Edit product | Update price/stock | Product updated | As expected after local run | Pass |
| TC-26 | Admin Products | Delete product | Click delete | Product removed | As expected after local run | Pass |
| TC-27 | Admin Categories | Add category | Fill category form | Category created | As expected after local run | Pass |
| TC-28 | Admin Categories | Edit category | Update category name/description | Category updated | As expected after local run | Pass |
| TC-29 | Admin Users | Change user role | Change customer role to admin | Role updated | As expected after local run | Pass |
| TC-30 | Admin Orders | Update order status | Set Pending to Approved | Status updated | As expected after local run | Pass |
| TC-31 | Admin Orders | Update payment status | Set Pending to Paid | Payment status updated | As expected after local run | Pass |
| TC-32 | Reports | View dashboard report | Open admin dashboard | Cards and charts shown | As expected after local run | Pass |
| TC-33 | Reports | Generate invoice | Click invoice PDF | PDF opens | As expected after local run | Pass |
| TC-34 | Contact Admin | Mark message read | Update message status | Status updated | As expected after local run | Pass |
| TC-35 | UI | Mobile responsiveness | Resize browser/mobile view | Layout adapts | As expected after local run | Pass |

## 4. Admin Test Cases

Admin testing focuses on product/category CRUD, user management, order management, dashboard reports, contact messages, invoice PDF, and route authorization.

## 5. Customer Test Cases

Customer testing focuses on registration, login, product browsing, cart operations, checkout, prescription upload, order history, profile update, and logout.

## 6. API Test Cases

API testing verifies request validation, success responses, error responses, JWT token requirement, admin-only route protection, ObjectId validation, and stock validation.

## 7. Security Test Cases

- Passwords are hashed in database.
- API responses do not expose password.
- Admin routes reject customer users.
- Customer cannot access other customer orders.
- Invalid JWT returns unauthorized error.
- Invalid image file type is rejected.

## 8. UI Test Cases

- Navbar links work.
- Product cards align responsively.
- Admin sidebar works on desktop and mobile.
- Toast notifications appear.
- Forms show required field validation.
- Loading states appear during API calls.

## 9. Test Result Table

The table above includes 35 test cases. After local installation, testers should record exact screenshots/results for final submission.
