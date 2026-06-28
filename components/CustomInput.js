import React, { useContext } from "react";
import { TextInput, StyleSheet } from "react-native";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  ...props
}) {
  const { isDark } = useContext(ThemeContext);

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDark
            ? "#1E1E1E"
            : Colors.white,

          color: isDark
            ? "#FFFFFF"
            : Colors.text,

          borderColor: isDark
            ? "#444"
            : Colors.border,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor={
        isDark ? "#A0A0A0" : "#9CA3AF"
      }
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 55,
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    marginTop: 18,
    fontSize: 16,
  },
});