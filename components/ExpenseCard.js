import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Colors from "../styles/colors";
import { ThemeContext } from "../context/ThemeContext";

export default function ExpenseCard({
  item,
  onDelete,
  onEdit,
}) {
  const { isDark } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark
            ? "#1E1E1E"
            : Colors.white,
        },
      ]}
    >
      <View>
        <Text
          style={[
            styles.title,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.text,
            },
          ]}
        >
          {item.title}
        </Text>

        <Text
          style={[
            styles.category,
            {
              color: isDark
                ? "#CFCFCF"
                : Colors.gray,
            },
          ]}
        >
          {item.category} • {item.date}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.amount}>
          - ₹{item.amount}
        </Text>

        <TouchableOpacity
          onPress={() => onEdit(item)}
        >
          <Text style={styles.edit}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
  onPress={() => {
    console.log("Delete pressed", item.id);
    onDelete(item.id);
  }}
>
          <Text style={styles.delete}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  category: {
    marginTop: 4,
  },

  rightContainer: {
    alignItems: "flex-end",
  },

  amount: {
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 18,
  },

  edit: {
    color: "#1976D2",
    marginTop: 8,
    fontWeight: "600",
  },

  delete: {
    color: "#D32F2F",
    marginTop: 8,
    fontWeight: "600",
  },
});