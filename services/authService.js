import { saveData, getData } from "../storage/storage";

const USER_KEY = "USER";

export const register = async (user) => {
  await saveData(USER_KEY, user);
};

export const login = async (email, password) => {
  const user = await getData(USER_KEY);

  if (
    user &&
    user.email === email &&
    user.password === password
  ) {
    return user;
  }

  return null;
};

export const logout = async () => {
  await saveData("LOGGED_IN", false);
};