const studentBtn = document.getElementById("studentBtn");
const adminBtn = document.getElementById("adminBtn");

const emailLabel = document.getElementById("emailLabel");
const emailInput = document.getElementById("email");

const registerSection = document.getElementById("registerSection");
const loginForm = document.getElementById("loginForm");


studentBtn.addEventListener("click", function () {

    studentBtn.classList.add("active");
    adminBtn.classList.remove("active");

    emailLabel.textContent = "Student Email ID";
    emailInput.placeholder = "Enter your student email";

    registerSection.style.display = "block";
});


adminBtn.addEventListener("click", function () {

    adminBtn.classList.add("active");
    studentBtn.classList.remove("active");

    emailLabel.textContent = "Admin Email ID";
    emailInput.placeholder = "Enter your admin email";

    registerSection.style.display = "none";
});


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value;
    const password = document.getElementById("password").value;

    if (adminBtn.classList.contains("active")) {

        console.log("Admin Login");
        console.log("Email:", email);
        console.log("Password:", password);

    } else {

        console.log("Student Login");
        console.log("Email:", email);
        console.log("Password:", password);

    }

});