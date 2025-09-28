# 💎 Crystal Beauty Clear - E-Commerce Platform for Girls

Crystal Beauty Clear is a fully responsive MERN stack e-commerce platform focused on girls’ products. The platform allows users to browse, select, and purchase beauty items with a seamless experience. Admins can manage products, view website statistics, and process user orders. The system emphasizes security, speed, and a modern design.

---

## 🌐 Live Website

<a href="https://cbc.sumudu.site">
  <img src="https://img.shields.io/badge/Visit-Live%20Website-%23ee0000?style=for-the-badge&logo=globe&logoColor=white" style="height:40px; background-color:blue;" />
</a>
<br>
🔗 Website: https://cbc.sumudu.site

---

## 🚀 Features

### 🛒 User Experience

- **Browse Products**
  - Explore a variety of beauty products prioritized for girls.
- **Product Details**
  - View detailed product descriptions, images, and prices.
- **Add to Cart & Checkout**
  - Add items to cart and checkout.
- **Order History**
  - View past orders and their status.
- **Google Login**
  - Sign in quickly using Google authentication.

### 🛍️ Admin Dashboard

- **Product Management**
  - Add, edit, and delete products.
- **Order Management**
  - View and process orders placed by users.
- **Website Statistics**
  - View sales, user data, and other analytics.
- **Secure Admin Authentication**
  - JWT-based login for admins.

### 🔒 Security & User Management

- **Session Management:** Authenticated access for users and admins.
- **Role-Based Access:** Separate dashboards and permissions.
- **Password Hashing:** Secure password storage.
- **JWT Authentication:** Used for secure API access.

---

## 🖥️ Deployed Server Specifications

Crystal Beauty Clear is deployed on:

- ✅ **Server Provider:** DigitalOcean
- 🌐 **Data Center Location:** BLR1 (Bangalore, India)
- 🧠 **Memory (RAM):** 2 GB
- 💾 **Disk Space:** 50 GB SSD
- 🖥️ **Operating System:** Ubuntu 24.04 LTS (x64)

---

## 🏁 Getting Started

Crystal Beauty Clear has separate repositories for frontend and backend.

### 1. Clone Repositories

```bash
# Frontend
git clone https://github.com/sumudu-k/-Crystal-Beauty-Clear-Web-FrontEnd.git
cd -Crystal-Beauty-Clear-Web-FrontEnd
npm install

# Backend
git clone https://github.com/sumudu-k/Crystal-Beauty-Clear-Web.git
cd Crystal-Beauty-Clear-Web
npm install
```

### 2. Configure Environment Variables

#### Backend: `.env` file

Copy `.env.example` to `.env` and update with your credentials:

```env
MONGO_DB_URI="your-mongodb-uri"
SECRET="your-jwt-secret"
```

#### Frontend: `.env` file

Copy `.env.example` to `.env` and update with your credentials:

```env
VITE_BACKEND_URL="http://localhost:5000"
VITE_GOOGLE_SIGN="your-google-client-id.apps.googleusercontent.com"
```

### 3. Import Database

- Ensure you have a MongoDB cluster (Atlas or local).
- The backend will create necessary collections on first run.

### 4. Start the Application

```bash
# Backend
cd Crystal-Beauty-Clear-Web
npm start

# Frontend (in separate terminal)
cd -Crystal-Beauty-Clear-Web-FrontEnd
npm run dev
```

### 5. Access the Application

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 💻 Tech Stack

- **Frontend**
  - React.js
  - Tailwind CSS (Modern responsive design)
  - Vite (Development/build tool)

- **Backend**
  - Node.js
  - Express.js (API server)
  - MongoDB (Database)
  - Supabase (Product image storage)
  - JWT (Authentication & authorization)


---

## 🤝 Contributing

We welcome improvements to Crystal Beauty Clear! To contribute:

1. Fork the frontend and backend repositories.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of your changes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🟡 Screenshots

<p float="left">
  <img src="https://raw.githubusercontent.com/sumudu-k/Crystal-Beauty-Clear-Web/refs/heads/main/Screenshots/cbc-cover1.png" width="48%" />
  <img src="https://raw.githubusercontent.com/sumudu-k/Crystal-Beauty-Clear-Web-FrontEnd/main/screenshots/cbc-cover2.png" width="48%" />
</p>
<p float="left">
  <img src="https://raw.githubusercontent.com/sumudu-k/Crystal-Beauty-Clear-Web-FrontEnd/main/screenshots/cbc-cover3.png" width="48%" />
  <img src="https://raw.githubusercontent.com/sumudu-k/Crystal-Beauty-Clear-Web-FrontEnd/main/screenshots/cbc-cover4.png" width="48%" />
</p>
<p float="left">
  <img src="https://raw.githubusercontent.com/sumudu-k/Crystal-Beauty-Clear-Web-FrontEnd/main/screenshots/cbc-cover5.png" width="48%" />
</p>
---

## 📁 Repository Links

- **Frontend:** [https://github.com/sumudu-k/-Crystal-Beauty-Clear-Web-FrontEnd](https://github.com/sumudu-k/-Crystal-Beauty-Clear-Web-FrontEnd)
- **Backend:** [https://github.com/sumudu-k/Crystal-Beauty-Clear-Web](https://github.com/sumudu-k/Crystal-Beauty-Clear-Web)

---

**Crystal Beauty Clear — Empowering Girls with Beautiful Choices!**
