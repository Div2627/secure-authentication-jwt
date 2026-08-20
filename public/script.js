const registerSection =
    document.getElementById("register-section");

const loginSection =
    document.getElementById("login-section");

const dashboardSection =
    document.getElementById("dashboard-section");


// ==============================
// SWITCH TO LOGIN
// ==============================

document
    .getElementById("show-login")
    .addEventListener("click", () => {

        registerSection.classList.add("hidden");
        loginSection.classList.remove("hidden");

    });


// ==============================
// SWITCH TO REGISTER
// ==============================

document
    .getElementById("show-register")
    .addEventListener("click", () => {

        loginSection.classList.add("hidden");
        registerSection.classList.remove("hidden");

    });


// ==============================
// REGISTER
// ==============================

document
    .getElementById("register-form")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const name =
            document.getElementById("register-name").value;

        const email =
            document.getElementById("register-email").value;

        const password =
            document.getElementById("register-password").value;

        const message =
            document.getElementById("register-message");

        try {

            const response = await fetch("/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {

                document.getElementById("register-form").reset();

                setTimeout(() => {

                    registerSection.classList.add("hidden");
                    loginSection.classList.remove("hidden");

                }, 1000);

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Registration failed";

        }

    });


// ==============================
// LOGIN
// ==============================

document
    .getElementById("login-form")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("login-email").value;

        const password =
            document.getElementById("login-password").value;

        const message =
            document.getElementById("login-message");

        try {

            const response = await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {

                loginSection.classList.add("hidden");
                dashboardSection.classList.remove("hidden");

            }

        } catch (error) {

            console.error(error);

            message.textContent =
                "Login failed";

        }

    });


// ==============================
// ACCESS PROTECTED PROFILE
// ==============================

document
    .getElementById("profile-btn")
    .addEventListener("click", async () => {

        const message =
            document.getElementById("profile-message");

        try {

            const response = await fetch(
                "/api/profile",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.message;

                return;
            }

            document.getElementById("profile-info").innerHTML =
                `👤 <strong>${data.name}</strong><br>
                 📧 ${data.email}`;

            message.textContent =
                "🔓 Protected route accessed successfully!";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to access profile";

        }

    });


// ==============================
// LOGOUT
// ==============================

document
    .getElementById("logout-btn")
    .addEventListener("click", async () => {

        try {

            const response = await fetch(
                "/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            console.log(data.message);

            dashboardSection.classList.add("hidden");
            loginSection.classList.remove("hidden");

            document
                .getElementById("login-message")
                .textContent = data.message;

        } catch (error) {

            console.error(error);

        }

    });