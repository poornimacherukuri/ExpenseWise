import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save data
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("Save Error:", error);
  }
};

/**
 * Get data
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null
      ? JSON.parse(jsonValue)
      : null;
  } catch (error) {
    console.log("Get Error:", error);
    return null;
  }
};

/**
 * Remove one item
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Remove Error:", error);
  }
};

/**
 * Clear entire storage
 */
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Clear Error:", error);
  }
};