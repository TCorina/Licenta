document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("languageSelect");

    // Definim direct traducerile în script
    const translations = {
        en: {
            title: "WELCOME TO YOUR AUTO MANAGER",
            subtitle: "Stay on Track with Your Car - All Your Auto Docs, One Place!",
            signIn: "Sign In",
            logIn: "Log In"
        },
        ro: {
            title: "BUN VENIT LA AUTO MANAGER",
            subtitle: "Ține evidența mașinii tale - toate documentele într-un singur loc!",
            signIn: "Înregistrare",
            logIn: "Autentificare"
        },
        fr: {
            title: "BIENVENUE DANS VOTRE AUTO MANAGER",
            subtitle: "Gardez le suivi de votre voiture - tous vos documents auto en un seul endroit!",
            signIn: "S'inscrire",
            logIn: "Connexion"
        }
    };

    function changeLanguage(language) {
        console.log("Schimb limba în:", language);

        if (translations[language]) {
            document.getElementById("mainTitle").textContent = translations[language].title;
            document.getElementById("subTitle").textContent = translations[language].subtitle;
            document.getElementById("signInBtn").textContent = translations[language].signIn;
            document.getElementById("logInBtn").textContent = translations[language].logIn;

            localStorage.setItem("language", language); // Salvăm limba selectată
        } else {
            console.error("Nu există traduceri pentru:", language);
        }
    }

    function loadLanguage() {
        const savedLanguage = localStorage.getItem("language") || "en";
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }

    languageSelect.addEventListener("change", function () {
        changeLanguage(languageSelect.value);
    });

    loadLanguage();
});
