import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getData,
  saveData,
} from "../storage/storage";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const storedExpenses =
        await getData("expenses");

      if (Array.isArray(storedExpenses)) {
        setExpenses(storedExpenses);
      } else {
        setExpenses([]);
        await saveData("expenses", []);
      }
    } catch (error) {
      console.log("Load Error:", error);
    }
  };

  const addExpense = async (expense) => {
    try {
      const updatedExpenses = [
        expense,
        ...expenses,
      ];

      setExpenses(updatedExpenses);

      await saveData(
        "expenses",
        updatedExpenses
      );
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  const updateExpense = async (
    updatedExpense
  ) => {
    try {
      const updatedExpenses =
        expenses.map((item) =>
          item.id === updatedExpense.id
            ? updatedExpense
            : item
        );

      setExpenses(updatedExpenses);

      await saveData(
        "expenses",
        updatedExpenses
      );
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const updatedExpenses =
        expenses.filter(
          (item) =>
            String(item.id) !== String(id)
        );

      setExpenses(updatedExpenses);

      await saveData(
        "expenses",
        updatedExpenses
      );
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const clearExpenses = async () => {
    try {
      setExpenses([]);

      await saveData("expenses", []);
    } catch (error) {
      console.log("Clear Error:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loadExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        clearExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};