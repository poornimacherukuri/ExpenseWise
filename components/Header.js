import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({
  title,
  subtitle,
}) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: isDark
              ? "#FFFFFF"
              : Colors.primary,
          },
        ]}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            {
              color: isDark
                ? "#CFCFCF"
                : Colors.gray,
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
  },
});