document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    successMessage.textContent = "";

    if (nameField.value.trim() === "") {
      showError(nameField, "Full name is required.");
      isValid = false;
    }

    if (!isValidEmail(emailField.value)) {
      showError(emailField, "Please enter a valid email.");
      isValid = false;
    }

    if (subjectField.value.trim() === "") {
      showError(subjectField, "Subject is required.");
      isValid = false;
    }

    if (messageField.value.trim() === "") {
      showError(messageField, "Message is required.");
      isValid = false;
    }

    if (messageField.value.trim() !== "" && messageField.value.trim().length < 10) {
      showError(messageField, "Message must be at least 10 characters.");
      isValid = false;
    }

    if (isValid) {
      successMessage.textContent = "Message sent successfully!!!";
      form.reset();
    }
  });

  function showError(field, message) {
    const errorEl = document.getElementById(`${field.id}-error`);
    errorEl.textContent = message;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
