import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ExpenseContext } from "../context/ExpenseContext";
import { ThemeContext } from "../context/ThemeContext";

import Colors from "../styles/colors";
import routes from "../constants/routes";

const ExpenseCard = ({ expense, navigation }) => {
  const { deleteExpense } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const handleDelete = () => {
  Alert.alert(
    "Delete Transaction",
    "Are you sure you want to delete this transaction?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteExpense(expense.id);
        },
      },
    ]
  );
};

  const handleEdit = () => {
    navigation.navigate(routes.EDIT_EXPENSE, {
      expense,
    });
  };

  const amountColor =
    expense.type === "Income"
      ? "#22C55E"
      : "#EF4444";

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
      <View style={styles.leftSection}>
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
          {expense.title}
        </Text>

        <Text style={styles.category}>
          {expense.category}
        </Text>

        <Text style={styles.date}>
          {expense.date}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text
          style={[
            styles.amount,
            {
              color: amountColor,
            },
          ]}
        >
          {expense.type === "Income" ? "+" : "-"} ₹
          {expense.amount}
        </Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    minHeight: 100,

    paddingVertical: 18,
    paddingHorizontal: 18,

    marginBottom: 14,

    borderRadius: 16,

    elevation: 3,
  },

  leftSection: {
    flex: 1,
    justifyContent: "center",
  },

  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  amount: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  actionContainer: {
    flexDirection: "row",
  },

  editButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
});