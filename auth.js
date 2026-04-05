// SIGNUP
function signup() {
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (username === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    // Get all users from localStorage or empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some(u => u.username === username)) {
        alert("Username already exists");
        return;
    }

    // Add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location = "login.html";
}

// LOGIN
function login() {
    const usernameInput = document.getElementById("loginUsername").value.trim();
    const passwordInput = document.getElementById("loginPassword").value.trim();

    // Get all users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        // Set logged-in user
        localStorage.setItem("loggedInUser", user.username);
        window.location = "index.html";
    } else {
        alert("Invalid credentials or user does not exist");
    }
}

// CHECK LOGIN
function checkLogin() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location = "login.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location = "login.html";
}