document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");
  const togglePassword = document.getElementById("togglePassword");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  // restore remembered email on page load
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
  }

  // password visibility toggle
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // email validation
  emailInput.addEventListener("blur", () => {
    if (!emailInput.value) {
      emailError.textContent = "Email is required";
      emailInput.style.borderColor = "#dc2626";
    } else if (!isValidEmail(emailInput.value)) {
      emailError.textContent = "Please enter a valid email";
      emailInput.style.borderColor = "#dc2626";
    } else {
      emailError.textContent = "";
      emailInput.style.borderColor = "#ccc";
    }
  });

  // password validation
  passwordInput.addEventListener("blur", () => {
    if (!passwordInput.value) {
      passwordError.textContent = "Password is required";
      passwordInput.style.borderColor = "#dc2626";
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordInput.style.borderColor = "#dc2626";
    } else {
      passwordError.textContent = "";
      passwordInput.style.borderColor = "#ccc";
    }
  });

  // form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // validate before submit
    if (!isValidEmail(emailInput.value)) {
      emailError.textContent = "Please enter a valid email";
      return;
    }

    if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      return;
    }

    // save email if remember me is checked
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedEmail", emailInput.value);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // submit form (replace with actual API call)
    console.log("Form submitted:", {
      email: emailInput.value,
      password: passwordInput.value,
      rememberMe: rememberCheckbox.checked,
    });

    // alert('Login successful!'); // remove in production
  });

  // email validation helper
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
