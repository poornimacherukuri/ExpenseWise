import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";

import Colors from "../styles/colors";

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor:
            disabled
              ? "#BDBDBD"
              : backgroundColor,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={Colors.white}
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 54,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 20,

    shadowColor: "#16A34A",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.18,

    shadowRadius: 12,

    elevation: 6,

    ...(Platform.OS === "web"
      ? {
          cursor: "pointer",
          transitionDuration: "150ms",
        }
      : {}),
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});