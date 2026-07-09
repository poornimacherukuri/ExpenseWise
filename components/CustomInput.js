import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  error = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  editable = true,
  leftIcon,
  ...props
}) {
  const { isDark } = useContext(ThemeContext);

  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] =
    useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.textPrimary,
            },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark
              ? "#1F2937"
              : Colors.white,

            borderColor: error
              ? Colors.danger
              : isFocused
              ? Colors.primary
              : isDark
              ? "#374151"
              : Colors.border,
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={
              isDark
                ? "#BDBDBD"
                : Colors.textSecondary
            }
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.textPrimary,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            isDark
              ? "#9CA3AF"
              : Colors.placeholder
          }
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() =>
              setHidePassword(!hidePassword)
            }
          >
            <Ionicons
              name={
                hidePassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color={
                isDark
                  ? "#BDBDBD"
                  : Colors.textSecondary
              }
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
  },

  leftIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },

  errorText: {
    color: Colors.danger,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
});