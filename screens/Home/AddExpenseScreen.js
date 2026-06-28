import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import Header from "../../components/Header";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import Colors from "../../styles/colors";
import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function AddExpenseScreen({ navigation }) {
  const { addExpense } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!title || !category || !amount) {
      Alert.alert("Please fill all fields");
      return;
    }

    addExpense({
      title,
      category,
      amount: Number(amount),
    });

    navigation.goBack();
  };

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
        contentContainerStyle={styles.container}
        style={{
          backgroundColor: isDark
            ? "#121212"
            : Colors.background,
        }}
      >
        <Header
          title="Add Expense"
          subtitle="Track your spending"
        />

        <CustomInput
          placeholder="Expense Title"
          value={title}
          onChangeText={setTitle}
        />

        <CustomInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <CustomInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <CustomButton
          title="Save Expense"
          onPress={handleSave}
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
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
});