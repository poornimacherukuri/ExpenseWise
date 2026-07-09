import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function SummaryCard({
  title,
  amount,
  icon,
  color,
}) {
  const { isDark } = useContext(ThemeContext);

  const [visible, setVisible] = useState(true);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark
            ? Colors.darkCard
            : Colors.white,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons
            name={icon}
            size={20}
            color={color}
          />

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
        </View>

        <TouchableOpacity
          onPress={() =>
            setVisible(!visible)
          }
        >
          <Ionicons
            name={
              visible
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={22}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color,
          },
        ]}
      >
        {visible
          ? `₹${Number(amount).toLocaleString()}`
          : "••••••••"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    padding: 18,

    borderRadius: 18,

    marginHorizontal: 6,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.12,

    shadowRadius: 10,

    elevation: 5,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  title: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: "600",
  },

  amount: {
    marginTop: 20,

    fontSize: 24,

    fontWeight: "700",
  },
});