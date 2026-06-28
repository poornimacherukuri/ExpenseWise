import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import CustomButton from "../../components/CustomButton";
import Colors from "../../styles/colors";

import { ThemeContext } from "../../context/ThemeContext";
import { getData } from "../../storage/storage";

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme } =
    useContext(ThemeContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getData("USER");
    setUser(data);
  };

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
          styles.name,
          {
            color: isDark
              ? "#FFFFFF"
              : Colors.text,
          },
        ]}
      >
        {user?.name || "ExpenseWise User"}
      </Text>

      <Text
        style={[
          styles.email,
          {
            color: isDark
              ? "#CCCCCC"
              : Colors.gray,
          },
        ]}
      >
        {user?.email || "demo@expensewise.com"}
      </Text>

      <View
        style={[
          styles.switchContainer,
          {
            backgroundColor: isDark
              ? "#1E1E1E"
              : "#FFFFFF",
          },
        ]}
      >
        <Text
          style={[
            styles.switchText,
            {
              color: isDark
                ? "#FFFFFF"
                : Colors.text,
            },
          ]}
        >
          Dark Theme
        </Text>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
        />
      </View>

      <CustomButton
        title="Logout"
        onPress={() => navigation.replace("Login")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  email: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
    elevation: 2,
  },

  switchText: {
    fontSize: 18,
    fontWeight: "600",
  },
});