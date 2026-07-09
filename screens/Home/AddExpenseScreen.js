import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";

import CustomButton from "../../components/CustomButton";
import Colors from "../../styles/colors";

const AddExpenseScreen = ({ navigation }) => {
  const { addExpense } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Expense");

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Salary",
    "Health",
    "Others",
  ];

  const handleSave = () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert(
        "Validation",
        "Please fill all fields."
      );
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      date: new Date().toLocaleDateString(),
    };

    addExpense(newExpense);

    Alert.alert(
      "Success",
      "Transaction added successfully!"
    );

    navigation.goBack();
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkBackground
            : Colors.background,
        },
      ]}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
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
          Add Transaction
        </Text>
      </View>

      <View
        style={[
          styles.formCard,
          {
            backgroundColor: isDark
              ? Colors.darkCard
              : Colors.white,
          },
        ]}
      >
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
          Title
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark
                ? "#1F2937"
                : "#FFFFFF",
              color: isDark
                ? "#FFFFFF"
                : "#000000",
              borderColor: isDark
                ? "#374151"
                : "#CCCCCC",
            },
          ]}
          placeholder="Enter transaction title"
          placeholderTextColor={
            isDark
              ? "#9CA3AF"
              : "#888888"
          }
          value={title}
          onChangeText={setTitle}
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
          Amount
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark
                ? "#1F2937"
                : "#FFFFFF",
              color: isDark
                ? "#FFFFFF"
                : "#000000",
              borderColor: isDark
                ? "#374151"
                : "#CCCCCC",
            },
          ]}
          placeholder="₹ Enter amount"
          placeholderTextColor={
            isDark
              ? "#9CA3AF"
              : "#888888"
          }
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
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
                    styles.selectedText,
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
                styles.selectedExpense,
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
                styles.selectedIncome,
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
          title="Add Transaction"
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

export default AddExpenseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 18,
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
    fontSize: 25,
    fontWeight: "700",
  },

  formCard: {
    borderRadius: 22,
    padding: 22,
    elevation: 5,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedCategory: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  categoryText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },

  selectedText: {
    color: "#FFFFFF",
  },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 25,
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

  selectedExpense: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  selectedIncome: {
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