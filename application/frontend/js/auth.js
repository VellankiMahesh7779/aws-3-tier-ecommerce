// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        if (!email || !password) {

            alert("Please fill all fields.");

            return;
        }


        alert(
            "Login API will be connected on Day 3."
        );

    });
}



// =========================
// REGISTER
// =========================

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirm-password").value;


        if (!name || !email || !password || !confirmPassword) {

            alert("Please fill all fields.");

            return;
        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        alert(
            "Registration API will be connected on Day 3."
        );

    });
}