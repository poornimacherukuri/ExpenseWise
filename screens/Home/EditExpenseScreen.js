import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import Colors from "../../styles/colors";
import { ThemeContext } from "../../context/ThemeContext";
import { ExpenseContext } from "../../context/ExpenseContext";

export default function EditExpenseScreen({
  route,
  navigation,
}) {
  const { expense } = route.params;

  const { updateExpense } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(
    String(expense.amount)
  );
  const [category, setCategory] = useState(
    expense.category
  );
  const [type, setType] = useState(expense.type);

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Salary",
    "Health",
    "Others",
  ];

  const handleUpdate = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert(
        "Validation",
        "Please fill all fields."
      );
      return;
    }

    await updateExpense({
      ...expense,
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
    });

    Alert.alert(
      "Success",
      "Transaction updated successfully."
    );

    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isDark
            ? Colors.darkBackground
            : Colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: isDark
                  ? Colors.darkCard
                  : "#F3F4F6",
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={
                isDark
                  ? Colors.white
                  : Colors.textPrimary
              }
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.heading,
              {
                color: isDark
                  ? Colors.white
                  : Colors.textPrimary,
              },
            ]}
          >
            Edit Transaction
          </Text>
        </View>

        <CustomInput
          label="Title"
          placeholder="Expense Title"
          value={title}
          onChangeText={setTitle}
          leftIcon="create-outline"
        />

        <CustomInput
          label="Amount"
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          leftIcon="cash-outline"
        />

        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? Colors.white
                : Colors.textPrimary,
            },
          ]}
        >
          Category
        </Text>

        <View style={styles.categoryContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                category === item &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                setCategory(item)
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={[
            styles.label,
            {
              color: isDark
                ? Colors.white
                : Colors.textPrimary,
            },
          ]}
        >
          Transaction Type
        </Text>

        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "Expense" &&
                styles.expenseSelected,
            ]}
            onPress={() =>
              setType("Expense")
            }
          >
            <Text
              style={[
                styles.typeText,
                type === "Expense" &&
                  styles.selectedTypeText,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "Income" &&
                styles.incomeSelected,
            ]}
            onPress={() =>
              setType("Income")
            }
          >
            <Text
              style={[
                styles.typeText,
                type === "Income" &&
                  styles.selectedTypeText,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Update Transaction"
          onPress={handleUpdate}
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
    padding: 20,
    paddingBottom: 40,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    elevation: 2,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedCategory: {
    backgroundColor: Colors.primary,
  },

  categoryText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 5,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    marginHorizontal: 5,
  },

  expenseSelected: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  incomeSelected: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },

  typeText: {
    fontSize: 16,
    fontWeight: "600",
  },

  selectedTypeText: {
    color: "#FFFFFF",
  },
});