import { saveData, getData } from "../storage/storage";

const USER_KEY = "USER";
const LOGGED_IN_KEY = "LOGGED_IN";

// Register User
export const register = async (user) => {
  const newUser = {
    id: Date.now().toString(),

    name: user.name.trim(),

    email: user.email.trim().toLowerCase(),

    password: user.password,

    income: 0,

    profileImage: "",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  await saveData(USER_KEY, newUser);

  // Every new user starts with no transactions
  await saveData("expenses", []);

  return {
    success: true,
  };
};

// Login
export const login = async (email, password) => {
  const user = await getData(USER_KEY);

  if (
    user &&
    user.email === email.trim().toLowerCase() &&
    user.password === password
  ) {
    await saveData(LOGGED_IN_KEY, true);

    return user;
  }

  return null;
};

// Logout
export const logout = async () => {
  await saveData(LOGGED_IN_KEY, false);
};

// Get Current User
export const getCurrentUser = async () => {
  return await getData(USER_KEY);
};

// Update User
export const updateUser = async (updatedUser) => {
  const currentUser = await getData(USER_KEY);

  if (!currentUser) return null;

  const newUser = {
    ...currentUser,
    ...updatedUser,
    updatedAt: new Date().toISOString(),
  };

  await saveData(USER_KEY, newUser);

  return newUser;
};

// Change Password
export const changePassword = async (
  oldPassword,
  newPassword
) => {
  const user = await getData(USER_KEY);

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (user.password !== oldPassword) {
    return {
      success: false,
      message: "Old password is incorrect",
    };
  }

  user.password = newPassword;
  user.updatedAt = new Date().toISOString();

  await saveData(USER_KEY, user);

  return {
    success: true,
  };
};

// Update Income
export const updateIncome = async (income) => {
  const user = await getData(USER_KEY);

  if (!user) return null;

  user.income = Number(income);

  user.updatedAt = new Date().toISOString();

  await saveData(USER_KEY, user);

  return user;
};

// Reset Password
export const resetPassword = async (
  email,
  newPassword
) => {
  const user = await getData(USER_KEY);

  if (
    !user ||
    user.email !== email.trim().toLowerCase()
  ) {
    return {
      success: false,
      message: "Email not found.",
    };
  }

  user.password = newPassword;
  user.updatedAt = new Date().toISOString();

  await saveData(USER_KEY, user);

  return {
    success: true,
  };
};