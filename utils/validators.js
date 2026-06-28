export const validateName = (name) => {
  if (!name.trim()) return "Name is required";
  return "";
};

export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email.trim()) return "Email is required";
  if (!regex.test(email)) return "Invalid email";
  return "";
};

export const validatePassword = (password) => {
  if (password.length < 6) return "Minimum 6 characters";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword)
    return "Passwords do not match";
  return "";
};