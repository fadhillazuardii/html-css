// =============================================
//  Toggle Password Visibility
// =============================================
function setupToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  if (!toggle || !input) return;

  toggle.addEventListener("click", function () {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    // Ganti ikon mata
    toggle.innerHTML = isPassword ? "&#128064;" : "&#128065;";
  });
}

setupToggle("togglePassword", "password");
setupToggle("toggleConfirm", "confirmPassword");

// =============================================
//  Helpers
// =============================================
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = "";
}

function setInputState(inputId, isValid) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.style.borderColor = isValid ? "#4caf50" : "red";
  input.style.boxShadow = isValid
    ? "0 0 5px rgba(76, 175, 80, 0.5)"
    : "0 0 5px rgba(255, 0, 0, 0.3)";
}

// =============================================
//  Validasi Real-time
// =============================================
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

emailInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    clearError("emailError");
    this.style.borderColor = "";
    this.style.boxShadow = "";
    return;
  }
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim());
  if (valid) {
    clearError("emailError");
    setInputState("email", true);
  } else {
    showError("emailError", "Format email tidak valid.");
    setInputState("email", false);
  }
});

passwordInput.addEventListener("input", function () {
  if (this.value === "") {
    clearError("passwordError");
    this.style.borderColor = "";
    this.style.boxShadow = "";
    return;
  }
  if (this.value.length < 8) {
    showError("passwordError", "Kata sandi minimal 8 karakter.");
    setInputState("password", false);
  } else {
    clearError("passwordError");
    setInputState("password", true);
  }

  // Re-validasi konfirmasi jika sudah diisi
  if (confirmInput.value !== "") {
    if (confirmInput.value !== this.value) {
      showError("confirmError", "Kata sandi tidak cocok.");
      setInputState("confirmPassword", false);
    } else {
      clearError("confirmError");
      setInputState("confirmPassword", true);
    }
  }
});

confirmInput.addEventListener("input", function () {
  if (this.value === "") {
    clearError("confirmError");
    this.style.borderColor = "";
    this.style.boxShadow = "";
    return;
  }
  if (this.value !== passwordInput.value) {
    showError("confirmError", "Kata sandi tidak cocok.");
    setInputState("confirmPassword", false);
  } else {
    clearError("confirmError");
    setInputState("confirmPassword", true);
  }
});

// =============================================
//  Submit Form
// =============================================
const form = document.getElementById("signupForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  const terms = document.getElementById("terms").checked;

  let isValid = true;

  // Reset pesan form
  formMessage.textContent = "";
  formMessage.style.color = "";

  // Validasi email
  if (!email) {
    showError("emailError", "Email tidak boleh kosong.");
    setInputState("email", false);
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("emailError", "Format email tidak valid.");
    setInputState("email", false);
    isValid = false;
  } else {
    clearError("emailError");
    setInputState("email", true);
  }

  // Validasi password
  if (!password) {
    showError("passwordError", "Kata sandi tidak boleh kosong.");
    setInputState("password", false);
    isValid = false;
  } else if (password.length < 8) {
    showError("passwordError", "Kata sandi minimal 8 karakter.");
    setInputState("password", false);
    isValid = false;
  } else {
    clearError("passwordError");
    setInputState("password", true);
  }

  // Validasi konfirmasi password
  if (!confirm) {
    showError("confirmError", "Konfirmasi kata sandi tidak boleh kosong.");
    setInputState("confirmPassword", false);
    isValid = false;
  } else if (confirm !== password) {
    showError("confirmError", "Kata sandi tidak cocok.");
    setInputState("confirmPassword", false);
    isValid = false;
  } else {
    clearError("confirmError");
    setInputState("confirmPassword", true);
  }

  // Validasi syarat & ketentuan
  if (!terms) {
    showError("termsError", "Anda harus menyetujui syarat & ketentuan.");
    isValid = false;
  } else {
    clearError("termsError");
  }

  if (!isValid) return;

  // Simulasi pengiriman data
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Memproses...";

  setTimeout(function () {
    btn.disabled = false;
    btn.textContent = "Daftar Sekarang";

    // Tampilkan pesan sukses
    formMessage.textContent = "✅ Akun berhasil dibuat! Silakan masuk.";
    formMessage.style.color = "#4caf50";

    // Reset form
    form.reset();
    ["email", "password", "confirmPassword"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }
    });
  }, 1500);
});