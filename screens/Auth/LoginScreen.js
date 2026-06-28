import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import Header from "../../components/Header";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { ThemeContext } from "../../context/ThemeContext";

import { login } from "../../services/authService";

import {
  validateEmail,
  validatePassword,
} from "../../utils/validators";

import routes from "../../constants/routes";
import Colors from "../../styles/colors";

export default function LoginScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      alert(emailError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    try {
      const user = await login(email, password);

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      alert(`Welcome ${user.name}!`);

      navigation.replace(routes.HOME);
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
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
          title="Welcome Back"
          subtitle="Login to continue"
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          style={[
            styles.link,
            {
              color: isDark
                ? "#81C784"
                : Colors.primary,
            },
          ]}
          onPress={() =>
            navigation.navigate(routes.REGISTER)
          }
        >
          Don't have an account? Register
        </Text>

        <CustomButton
          title="Login"
          onPress={handleLogin}
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

  link: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
  },
});