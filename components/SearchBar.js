import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const SearchBar = ({ value, onChangeText }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkCard
            : "#FFFFFF",
        },
      ]}
    >
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        style={[
          styles.input,
          {
            color: isDark ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="Search expenses..."
        placeholderTextColor={
          isDark ? "#BDBDBD" : "#888888"
        }
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    height: 50,
  },

  icon: {
    fontSize: 18,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
});