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

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validators";

import { register } from "../../services/authService";
import routes from "../../constants/routes";
import Colors from "../../styles/colors";

export default function RegisterScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const nameError = validateName(name);
    if (nameError) {
      alert(nameError);
      return;
    }

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

    const confirmError = validateConfirmPassword(
      password,
      confirmPassword
    );

    if (confirmError) {
      alert(confirmError);
      return;
    }

    try {
      await register({
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigation.navigate(routes.LOGIN);
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
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
        <Header title="Create Account" />

        <CustomInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
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

        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <CustomButton
          title="Create Account"
          onPress={handleRegister}
        />

        <Text
          style={[
            styles.loginText,
            {
              color: isDark
                ? "#81C784"
                : Colors.primary,
            },
          ]}
          onPress={() =>
            navigation.navigate(routes.LOGIN)
          }
        >
          Already have an account? Login
        </Text>
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

  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});