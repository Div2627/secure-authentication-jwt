const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));


// ==============================
// USER STORAGE
// ==============================

function getUsers() {
    const data = fs.readFileSync("users.json", "utf-8");
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(
        "users.json",
        JSON.stringify(users, null, 2)
    );
}


// ==============================
// REGISTER
// ==============================

app.post("/api/auth/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const users = getUsers();

        const existingUser = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        };

        users.push(newUser);

        saveUsers(users);

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});


// ==============================
// LOGIN
// ==============================

app.post("/api/auth/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const users = getUsers();

        const user = users.find(
            user => user.email === email.toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        res.json({
            message: "Login successful"
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});


// ==============================
// JWT MIDDLEWARE
// ==============================

function authenticateToken(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}


// ==============================
// PROTECTED ROUTE
// ==============================

app.get("/api/profile", authenticateToken, (req, res) => {

    const users = getUsers();

    const user = users.find(
        user => user.id === req.user.id
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email
    });
});


// ==============================
// LOGOUT
// ==============================

app.post("/api/auth/logout", (req, res) => {

    res.clearCookie("token");

    res.json({
        message: "Logged out successfully"
    });
});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});