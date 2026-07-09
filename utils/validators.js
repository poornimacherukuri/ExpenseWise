// Name Validation
export const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required";
  }

  if (trimmedName.length < 3) {
    return "Name must contain at least 3 characters";
  }

  const regex = /^[A-Za-z ]+$/;

  if (!regex.test(trimmedName)) {
    return "Only alphabets are allowed";
  }

  return "";
};

// Email Validation
export const validateEmail = (email) => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Email is required";
  }

  const regex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regex.test(trimmedEmail)) {
    return "Enter a valid email address";
  }

  return "";
};

// Password Validation
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Include at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Include at least one lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Include at least one number";
  }

  return "";
};

// Confirm Password Validation
export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};