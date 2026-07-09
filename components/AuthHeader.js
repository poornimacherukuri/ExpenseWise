import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const AuthHeader = ({ title, subtitle }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: isDark
              ? Colors.white
              : Colors.text,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: isDark
              ? "#BBBBBB"
              : Colors.lightText,
          },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
  },
});