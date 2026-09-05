const API_URL = "http://localhost:5000/api";


// ========================================
// REGISTER
// ========================================

const registerForm =
    document.getElementById("register-form");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            // Prevent page refresh
            event.preventDefault();


            // Get form values
            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirm-password").value;


            // Check passwords
            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;
            }


            try {

                // Send registration request
                const response = await fetch(
                    `${API_URL}/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    }
                );


                // Convert response to JSON
                const data =
                    await response.json();


                // Handle error
                if (!response.ok) {

                    alert(data.message);

                    return;
                }


                // Registration successful
                alert(
                    "Registration successful! Please login."
                );


                // Redirect to login
                window.location.href = "login.html";


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                alert(
                    "Unable to connect to the server."
                );

            }

        }
    );

}


// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;


            try {

                const response = await fetch(
                    `${API_URL}/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(data.message);

                    return;
                }


                // Store logged-in user
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert(
                    `Welcome ${data.user.name}!`
                );


                // Redirect to homepage
                window.location.href =
                    "index.html";


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(
                    "Unable to connect to the server."
                );

            }

        }
    );

}