// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("login-form");
//   const errorMessage = document.getElementById("error-message");

//   // Predefined dealer credentials
//   const predefinedEmail = "dealer1@gmail.com";
//   const predefinedPassword = "123456";

//   loginForm.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission

//     const email = document.getElementById("dealer-email").value;
//     const password = document.getElementById("dealer-password").value;

//     // Check if the entered credentials match predefined values
//     if (email === predefinedEmail && password === predefinedPassword) {
//       window.location.href = "dealer-dashboard.html"; // Redirect to dealer page
//     } else {
//       errorMessage.style.display = "block"; // Show error message
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("admin-login-form");
  const errorMessage = document.getElementById("error-message");

  // Predefined dealer credentials with associated dashboard pages
  const admin = {
    "superadmin@gmail.com": {
      password: "asdfgh",
      dashboard: "admin-dashboard.html",
    },
  };

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;

    // Check if email exists in admin and password matches
    if (admin[email] && admin[email].password === password) {
      window.location.href = admin[email].dashboard; // Redirect to the respective dashboard
    } else {
      errorMessage.style.display = "block"; // Show error message
    }
  });
});
