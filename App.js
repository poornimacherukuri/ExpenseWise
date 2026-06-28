import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./navigation/AppNavigator";
import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <>
          <StatusBar style="auto" />

          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </>
      </ExpenseProvider>
    </ThemeProvider>
  );
}