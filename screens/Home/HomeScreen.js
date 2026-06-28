import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Platform,
} from "react-native";

import Header from "../../components/Header";
import ExpenseCard from "../../components/ExpenseCard";
import CustomButton from "../../components/CustomButton";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";

import Colors from "../../styles/colors";
import routes from "../../constants/routes";

import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { expenses, deleteExpense, updateExpense } =
    useContext(ExpenseContext);

  const { isDark } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredExpenses = expenses.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      item.category === category;

    return matchSearch && matchCategory;
  });

  const totalExpense = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  // Demo income
  const totalIncome = 40000;
  const totalBalance = totalIncome - totalExpense;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isDark
            ? "#121212"
            : Colors.background,
        },
      ]}
    >
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: isDark
              ? "#121212"
              : Colors.background,
          },
        ]}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Header
          title="ExpenseWise"
          subtitle="Track your daily expenses"
        />

        <Text
          style={[
            styles.greeting,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.gray,
            },
          ]}
        >
          Welcome Back 👋
        </Text>

        <View style={styles.balanceCard}>
          <Text style={styles.label}>
            Total Balance
          </Text>

          <Text style={styles.balance}>
            ₹{totalBalance.toLocaleString()}
          </Text>
        </View>

        <Text
          style={[
            styles.total,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.gray,
            },
          ]}
        >
          Total Transactions : {expenses.length}
        </Text>

        <View style={styles.row}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark
                  ? "#1E1E1E"
                  : "#FFFFFF",
              },
            ]}
          >
            <Text style={styles.cardTitle}>
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
                  : "#FFFFFF",
              },
            ]}
          >
            <Text style={styles.cardTitle}>
              Expense
            </Text>

            <Text style={styles.expense}>
              ₹{totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.section,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.text,
            },
          ]}
        >
          Recent Expenses
        </Text>

        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <CategoryFilter
          selected={category}
          onSelect={setCategory}
        />

        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <ExpenseCard
              item={item}
              onDelete={(id) => {
                if (Platform.OS === "web") {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this expense?"
                  );

                  if (confirmed) {
                    deleteExpense(id);
                  }
                } else {
                  Alert.alert(
                    "Delete Expense",
                    "Are you sure you want to delete this expense?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteExpense(id),
                      },
                    ]
                  );
                }
              }}
              onEdit={(expense) =>
                navigation.navigate(
                  routes.EDIT_EXPENSE,
                  {
                    expense,
                    updateExpense,
                  }
                )
              }
            />
          )}
          ListEmptyComponent={
            <Text
              style={[
                styles.empty,
                {
                  color: isDark
                    ? "#FFFFFF"
                    : Colors.gray,
                },
              ]}
            >
              No expenses found.
              {"\n"}
              Tap "Add Expense" to create one.
            </Text>
          }
        />

        <CustomButton
          title="Add Expense"
          onPress={() =>
            navigation.navigate(routes.ADD_EXPENSE)
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  greeting: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },

  balanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 25,
    marginTop: 10,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 8,
  },

  total: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  card: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 15,
    color: Colors.gray,
  },

  income: {
    color: "green",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  expense: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  section: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});