const registrationForm = document.getElementById("registrationForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordMessage = document.getElementById("passwordMessage");


// Check password match
confirmPassword.addEventListener("input", function () {

    if (confirmPassword.value === "") {
        passwordMessage.textContent = "";
        return;
    }

    if (password.value === confirmPassword.value) {
        passwordMessage.textContent = "Passwords match";
        passwordMessage.className = "success-message";
    } else {
        passwordMessage.textContent = "Passwords do not match";
        passwordMessage.className = "error-message";
    }
});


// Registration form validation
registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (password.value !== confirmPassword.value) {
        passwordMessage.textContent = "Passwords do not match";
        passwordMessage.className = "error-message";
        return;
    }

    alert("Registration successful!");

    registrationForm.reset();
    passwordMessage.textContent = "";
});