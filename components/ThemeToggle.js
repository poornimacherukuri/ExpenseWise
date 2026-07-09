import React, { useContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

export default function ThemeToggle() {
  const { isDark, toggleTheme } =
    useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkCard
            : Colors.white,
        },
      ]}
    >
      <Ionicons
        name={
          isDark
            ? "sunny-outline"
            : "moon-outline"
        }
        size={22}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.12,

    shadowRadius: 8,

    elevation: 6,
  },
});