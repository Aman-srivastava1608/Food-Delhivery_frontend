// Dummy Admin Credentials
const adminUsername = "admin";
const adminPassword = "Aman@1234";

// Login Function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "index.html";
    } else {
        document.getElementById("error-msg").innerText = "Invalid username or password!";
    }
}

// Check Authentication
function checkAuth() {
    if (localStorage.getItem("isAdmin") !== "true") {
        window.location.href = "login.html";
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}

// Show Selected Section
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}

// Admin Panel Functions
function updateOrder() {
    alert("Order status updated successfully!");
}

function addMenuItem() {
    alert("New menu item added!");
}

function editItem() {
    alert("Edit menu item functionality coming soon!");
}

function deleteItem() {
    if (confirm("Are you sure you want to delete this item?")) {
        alert("Item deleted successfully!");
    }
}

function deleteUser() {
    if (confirm("Are you sure you want to delete this user?")) {
        alert("User deleted successfully!");
    }
}
