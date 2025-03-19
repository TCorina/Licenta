document.addEventListener("DOMContentLoaded", () => {
    // === GESTIONARE LIMBĂ ===
    const languageSelect = document.getElementById("languageSelect");
    const savedLang = localStorage.getItem("lang") || "en";
    if (languageSelect) {
        languageSelect.value = savedLang;
        languageSelect.addEventListener("change", (e) => {
            localStorage.setItem("lang", e.target.value);
            location.reload();
        });
    }

    fetch("languages.json")
        .then((response) => response.json())
        .then((translations) => {
            document.querySelectorAll("[data-translate]").forEach((element) => {
                const key = element.getAttribute("data-translate");
                if (translations[savedLang] && translations[savedLang][key]) {
                    if (element.tagName === "INPUT") {
                        element.placeholder = translations[savedLang][key];
                    } else {
                        element.textContent = translations[savedLang][key];
                    }
                }
            });
        });

    // === PROTECȚIE: DACĂ EȘTI LOGAT, TE TRIMITE PE DASHBOARD ===
    if (localStorage.getItem("isAuthenticated") === "true" &&
        ["signup.html", "login.html"].some(page => location.pathname.endsWith(page))) {
        console.log("User already logged in, redirecting...");
        location.href = "userDashboard.html";
    }

    // === REGISTRARE UTILIZATOR ===
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            };

            if (localStorage.getItem(user.username) || localStorage.getItem(user.email) || localStorage.getItem(user.phone)) {
                alert("User already exists!");
                return;
            }

            localStorage.setItem(user.username, JSON.stringify(user));
            alert("Account created successfully! Now log in.");
            location.href = "login.html";
        });
    }

    // === AUTENTIFICARE UTILIZATOR ===
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const identifier = document.getElementById("userIdentifier").value;
            const password = document.getElementById("passwordLogin").value;
            let foundUser = null;

            console.log("Attempting login with:", identifier);

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key || key === "isAuthenticated" || key === "currentUser" || key === "lang") continue;
                
                const user = JSON.parse(localStorage.getItem(key));

                if (!user) continue;

                console.log("Checking user:", user.username, user.email, user.phone);

                if ((user.username === identifier || user.email === identifier || user.phone === identifier) &&
                    user.password === password) {
                    foundUser = user;
                    break;
                }
            }

            if (foundUser) {
                console.log("User authenticated successfully:", foundUser.username);
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("currentUser", foundUser.username);
                alert("Login successful!");
                window.location.href = "userDashboard.html";  // Redirecționare spre dashboard
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    // === PROTEJAREA PAGINILOR SECURIZATE ===
    if (["userDashboard.html", "registercar.html", "carManager.html"].some(page => location.pathname.endsWith(page))) {
        if (!localStorage.getItem("isAuthenticated")) {
            alert("You must log in first!");
            location.href = "login.html";
        }
    }

    // === LOGOUT ===
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            console.log("User logging out...");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("currentUser");
            location.href = "index.html";
        });
    }
});
