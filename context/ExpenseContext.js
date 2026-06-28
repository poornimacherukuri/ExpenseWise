import React, { createContext, useEffect, useState } from "react";
import { getData, saveData } from "../storage/storage";
import dummyExpenses from "../data/dummyExpenses";

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      saveData("EXPENSES", expenses);
    }
  }, [expenses]);

  const loadExpenses = async () => {
    const storedExpenses = await getData("EXPENSES");

    if (storedExpenses) {
      setExpenses(storedExpenses);
    } else {
      setExpenses(dummyExpenses);
    }
  };

  const addExpense = (expense) => {
    setExpenses((prev) => [
      {
        id: Date.now().toString(),
        ...expense,
        date: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === updatedExpense.id ? updatedExpense : item
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}