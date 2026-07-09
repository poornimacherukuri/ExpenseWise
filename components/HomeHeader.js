import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const HomeHeader = ({ title }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

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
      <View>
        <Text
          style={[
            styles.greeting,
            {
              color: isDark ? "#BBBBBB" : "#666666",
            },
          ]}
        >
          Welcome Back 👋
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: isDark ? "#FFFFFF" : "#000000",
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text
          style={{
            color: isDark ? "#FFFFFF" : "#000000",
            marginRight: 8,
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor="#4F46E5"
          trackColor={{
            false: "#CFCFCF",
            true: "#8B83FF",
          }}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 20,
  paddingTop: 50,
  paddingBottom: 20,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 3,
},

  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});