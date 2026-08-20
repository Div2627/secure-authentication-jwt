# Secure Authentication & JWT

A secure authentication web application built with Node.js and Express.js, implementing user registration, bcrypt password hashing, JWT-based authentication, protected API routes, and HTTP-only cookies.

## 🚀 Live Demo

🔗 **Live Demo:** `https://YOUR-RENDER-URL.onrender.com`

> The live demo link will be updated after deployment.

## 📌 Features

* User registration
* Secure password hashing using bcrypt
* User login authentication
* JWT token generation
* HTTP-only cookie-based authentication
* Protected API routes
* Authentication middleware
* Logout functionality
* Responsive dark-themed interface

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Authentication:** JSON Web Tokens (JWT)
* **Password Security:** bcrypt
* **Storage:** JSON file
* **Deployment:** Render

## 🔐 Authentication Flow

```text
User Registration
       ↓
Password hashed with bcrypt
       ↓
User stored in users.json
       ↓
User Login
       ↓
Password verified
       ↓
JWT generated
       ↓
JWT stored in HTTP-only cookie
       ↓
Protected routes can be accessed
```

## 📡 API Endpoints

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| POST   | `/api/auth/register` | Register a new user                     |
| POST   | `/api/auth/login`    | Login and receive authentication cookie |
| POST   | `/api/auth/logout`   | Logout and clear authentication cookie  |
| GET    | `/api/profile`       | Access protected user profile           |

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/secure-authentication-jwt.git
```

### 2. Open the project

```bash
cd secure-authentication-jwt
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set the JWT secret

Create a `.env` file:

```env
JWT_SECRET=your_secure_jwt_secret
```

### 5. Start the server

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
secure-authentication-jwt/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── users.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## 🔒 Security

Passwords are never stored as plain text. They are hashed using bcrypt before being stored.

JWT authentication is implemented using HTTP-only cookies, helping prevent client-side JavaScript from directly accessing the authentication token.

The production JWT secret is supplied through an environment variable rather than being committed to the repository.

## 👨‍💻 Author

**Divya BK**

---

⭐ Built as a full-stack authentication project demonstrating secure registration, login, JWT authentication, and protected backend routes.
