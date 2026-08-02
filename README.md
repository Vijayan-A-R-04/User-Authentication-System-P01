# 🔐 User Authentication System (AuthVault)

A production-grade full-stack user authentication system built with **Node.js**, **Express**, **MongoDB (Mongoose)**, **JSON Web Tokens (JWT)**, and **bcryptjs**.

🌐 **Live Demo Application**: [https://vijayan-a-r-04.github.io/portfolio-website/live-demos/auth-app/index.html](https://vijayan-a-r-04.github.io/portfolio-website/live-demos/auth-app/index.html)  
💻 **GitHub Repository**: [https://github.com/Vijayan-A-R-04/User-Authentication-System-P01](https://github.com/Vijayan-A-R-04/User-Authentication-System-P01)

---

## ✨ Features

- 🔑 **User Registration**: Hashing passwords using `bcryptjs` with salt rounds.
- 🔓 **Secure Login**: Authenticates credentials and issues signed JWT access tokens.
- 🛡️ **JWT Middleware Protection**: Intercepts requests to protected endpoints (`/api/auth/dashboard`) and verifies `Authorization: Bearer <token>`.
- 📊 **User Session Dashboard**: Displays active user ID, session token payload, and token verification options.
- 🎨 **Modern Glassmorphism UI**: Built with pure CSS3 variables, responsive design, dark mode, micro-animations, and dynamic status indicators.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **Security & Hashing**: bcryptjs, jsonwebtoken (JWT), CORS, dotenv
- **Frontend**: HTML5, Modern Vanilla CSS3, JavaScript (Fetch API)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on port 27017 or a MongoDB Atlas URI)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vijayan-A-R-04/User-Authentication-System-P01.git
   cd User-Authentication-System-P01
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/auth_db
   JWT_SECRET=super_secret_auth_jwt_key_2026
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   Open `http://localhost:5000` in your web browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registers a new user account | ❌ No |
| `POST` | `/api/auth/login` | Authenticates user & returns JWT token | ❌ No |
| `GET` | `/api/auth/dashboard` | Returns protected session dashboard data | ✅ Yes (`Bearer <token>`) |

---

## 📄 License
This project is licensed under the MIT License.
