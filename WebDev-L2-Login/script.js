const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const successMessage = document.getElementById("successMessage");

const togglePassword = document.getElementById("togglePassword");

const forgotBtn = document.getElementById("forgotBtn");
const signupBtn = document.getElementById("signupBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");


/* PASSWORD VISIBILITY */

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "◉";

    } else {

        password.type = "password";

        togglePassword.textContent = "○";

    }

});


/* LOGIN VALIDATION */

form.addEventListener("submit", (event) => {

    event.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    let valid = true;

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailValue === "") {

        emailError.textContent =
            "Please enter your email address.";

        valid = false;

    } else if (!emailPattern.test(emailValue)) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    if (passwordValue === "") {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    } else if (passwordValue.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }


    if (valid) {

        successMessage.textContent =
            "✓ Validation successful — welcome back!";

        form.reset();

    }

});


/* FORGOT PASSWORD */

forgotBtn.addEventListener("click", () => {

    modalTitle.textContent =
        "Reset your password";

    modalText.textContent =
        "Enter your email address and we will guide you through the password reset process.";

    modal.classList.add("active");

});


/* CREATE ACCOUNT */

signupBtn.addEventListener("click", (event) => {

    event.preventDefault();

    modalTitle.textContent =
        "Create your account";

    modalText.textContent =
        "Your account setup would begin here. This demo focuses on the authentication interface.";

    modal.classList.add("active");

});


/* CLOSE MODAL */

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});