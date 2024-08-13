# BNPL E-Commerce

This is our first version of BNPL that includes many new features.

## Hosted backend link

[Hosted backend link](https://bnpl-store-be.onrender.com/)

## API Documentation Link

[Hosted API documentation link](https://bnpl-store-be.onrender.com/api-docs)

## List of completed Endpoints

1. Welcome endpoint.
2. User registration endpoint.
3. User Login endpoint
4. User verify the email address
5. User forgot password endpoint.
6. User reset password endpoint.
7. User logout endpoint.
8. User update profile
9. User view profile
10. Admin Create product
11. View all products
12. View specific product
13. Admin create Product
14. Admin view categories
15. User add product to wishlist
16. User view his/her Wishlist created
17. User Delete or remove product from wishlist
18. User Can Add and Update Products to cart
19. Admin create Supplier
20. Admin view all Supplier with their information
21. Admin view Specific Supplier Information
22. Admin able to delete Supplier
## Table of completed Endpoints

| Verb | Endpoint                              | Name                           | Status  |
| ---- | ------------------------------------- | ------------------------------ | ------- |
| GET  | /api/v1/                              | Welcome endpoint               | OK      |
| POST | /api/v1/auth/register                 | Register endpoint              | CREATED |
| POST | /api/v1/auth/login                    | LogIn endpoint                 | OK      |
| POST | /api/v1/auth/verify-email             | Verify email endpoint          | OK      |
| POST | /api/v1/auth/forgot-password          | Forgot password endpoint       | OK      |
| POST | /api/v1/auth/reset-password           | Reset password endpoint        | OK      |
| POST | /api/v1/auth/logout                   | User Logout endpoint           | OK      |
| PUT  | /api/v1/user/user-update-profile      | User Update profile endpoint   | OK      |
| GET  | /api/v1/user/user-view-profile        | User View Profile endpoint     | OK      |
| POST | /api/product/create-product           | Create product endpoint        | CREATED |
| GET  | /api/v1/product/view-all-products     | All products endpoint          | OK      |
| GET  | /api/v1/product/view-specific-product | Vire specific product          | OK      |
| POST | /api/v1/product/create-category       | Admin Create category endpoint | OK      |
| GET  | /api/v1/product/view-categories       | View categories endpoint       | OK      |
|POST|   /api/v1/wishlist/user-add-product-to-wishlist | user able to add product to his/her wishlist endpoint   | OK    |
|GET| /api/v1/wishlist/view-wishlist           | User view his/her Wishlist endpoint |OK  |
|DELETE| /api/v1/wishlist/delete-product-from-wishlist | User Delete product from wishlist endpoint  | OK       |
|POST|  /api/v1/supplier/create-supplier       | Admin Create Supplier Endpoint  | OK       |  
|GET| /api/v1/supplier/get-all-suppliers       | Admin View All Supplier endpoint| OK      |
|GET| /api/v1/supplier/get-supplier/:id        | Admin View Specific Supplier    | OK      |
|DELETE| /api/v1/supplier/delete-supplier/:id  | Admin Delete Supplier           | OK      || POST | /api/v1/cart/add-product-to-cart      | Add Product to Cart            | OK      |
