import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";
import Colors from "../../styles/colors";

export default function StatisticsScreen() {
  const { expenses } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalIncome = 40000;
  const totalBalance = totalIncome - totalExpense;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? "#121212"
            : Colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.heading,
          {
            color: isDark
              ? "#FFFFFF"
              : Colors.text,
          },
        ]}
      >
        Statistics
      </Text>

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
        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? "#CCCCCC"
                : Colors.gray,
            },
          ]}
        >
          Total Balance
        </Text>

        <Text style={styles.balance}>
          ₹{totalBalance.toLocaleString()}
        </Text>
      </View>

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
        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? "#CCCCCC"
                : Colors.gray,
            },
          ]}
        >
          Income
        </Text>

        <Text style={styles.income}>
          ₹{totalIncome.toLocaleString()}
        </Text>
      </View>

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
        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? "#CCCCCC"
                : Colors.gray,
            },
          ]}
        >
          Expenses
        </Text>

        <Text style={styles.expense}>
          ₹{totalExpense.toLocaleString()}
        </Text>
      </View>

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
        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? "#CCCCCC"
                : Colors.gray,
            },
          ]}
        >
          Transactions
        </Text>

        <Text style={styles.value}>
          {expenses.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 25,
  },

  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  label: {
    fontSize: 16,
  },

  value: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 8,
  },

  balance: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1976D2",
    marginTop: 8,
  },

  income: {
    fontSize: 28,
    fontWeight: "700",
    color: "green",
    marginTop: 8,
  },

  expense: {
    fontSize: 28,
    fontWeight: "700",
    color: "red",
    marginTop: 8,
  },
});