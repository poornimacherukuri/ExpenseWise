import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function QuickActionCard({
  title,
  subtitle,
  icon,
  color = Colors.primary,
  onPress,
}) {
  const { isDark } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: isDark
            ? Colors.darkCard
            : Colors.white,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={26}
          color={color}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? Colors.white
                : Colors.textPrimary,
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
                ? "#BDBDBD"
                : Colors.textSecondary,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    padding: 18,

    borderRadius: 18,

    marginBottom: 15,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.1,

    shadowRadius: 8,

    elevation: 5,
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
  },
});