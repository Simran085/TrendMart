
# 🛍️ TrendMart

> A responsive and secure full-stack e-commerce web application featuring JWT-based authentication, admin product management, and a seamless shopping experience.

---

## 📌 Overview

**TrendMart** is a feature-rich retail web application built using the **MERN stack** – MongoDB, Express.js, React.js, and Node.js. Designed for modern online shopping, it supports real-time product updates, secure authentication, and a responsive, mobile-friendly interface.

The platform enables both customers and administrators to interact with the system efficiently. Shoppers can explore products, manage their carts, and proceed to checkout. Meanwhile, admins can manage the product catalog via a dedicated dashboard.

---

## 🚀 Key Features

### 🛒 For Shoppers
- **Dynamic Product Catalog** with real-time updates.
- **Category-based Browsing** (Men, Women, Kids).
- **Detailed Product Pages** with price, images, sizes, and reviews.
- **Shopping Cart** with real-time total calculation and quantity control.
- **Persistent Cart State** using `localStorage`.
- **Newsletter Signup** for promotional outreach.

### 🔐 Authentication
- **JWT-based Login & Signup** for secure user sessions.
- **Token-based Authorization Headers** for protected routes.
- **Role-based Access Control** to separate admin and user privileges.

### 🛠️ For Admins
- **CRUD Operations** for Products via Admin Panel.
- **Product Uploads with Multer** (image support).
- **Secure APIs** protected by `fetchUser` JWT middleware.
- **Real-time Product Management** (add/update/delete instantly reflected).

### 📱 UI & UX
- **Responsive Design** for mobile, tablet, and desktop devices.
- **Hero Sections, Banners, and Offers** to enhance user engagement.
- **Breadcrumbs & Navigation** using `react-router-dom`.
- **Accessible Footer & Social Links** with screen reader support.

### 📦 Backend & Security
- **MongoDB Data Modeling** for products, users, and cart items.
- **Mongoose ODM** with schema validation.
- **JWT Token Verification** with middleware (`fetchUser.js`).
- **Password Hashing** using `bcrypt` (suggested improvement).
- **Centralized Error Handling** (planned improvement).

---

## 🧭 User Flow

### 👤 User Journey:
1. Visit homepage → View products by category or collection.
2. Click product → View details → Add to cart.
3. Register/Login → JWT issued → Cart persists.
4. Checkout (future integration with payment gateway).

### 👨‍💼 Admin Journey:
1. Login with admin credentials.
2. Access dashboard to manage products.
3. Add new products (with image), update price/stock, or delete items.
4. All changes reflected instantly in the customer-facing UI.

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Frontend      | React.js, Context API, Axios, CSS |
| Backend       | Node.js, Express.js               |
| Database      | MongoDB, Mongoose                 |
| Authentication| JWT (JSON Web Tokens)             |
| File Uploads  | Multer                            |
| Styling       | CSS, Media Queries                |


