import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import ThemeToggle from "../../components/ThemeToggle";
import AuthHeader from "../../components/AuthHeader";
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

  const { isDark, toggleTheme } =
    useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {

    const newErrors = {

      name: validateName(name),

      email: validateEmail(email),

      password: validatePassword(password),

      confirmPassword:
        validateConfirmPassword(
          password,
          confirmPassword
        ),

    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);

  };

  const handleRegister = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        email: result.message,
      }));
      return;
    }

    navigation.replace(routes.LOGIN);

  } catch (error) {
    console.log(error);

    setLoading(false);

    setErrors((prev) => ({
      ...prev,
      email: "Unable to register. Please try again.",
    }));
  }
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >

      <View style={styles.themeWrapper}>
  <ThemeToggle />
</View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? Colors.darkCard
                : Colors.white,
            },
          ]}
        >

          <AuthHeader
            title="Create Account"
            subtitle="Create your ExpenseWise account"
          />

          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => {
              setName(text);

              setErrors({
                ...errors,
                name: "",
              });
            }}
            leftIcon="person-outline"
            error={errors.name}
          />

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);

              setErrors({
                ...errors,
                email: "",
              });
            }}
            keyboardType="email-address"
            leftIcon="mail-outline"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Create password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);

              setErrors({
                ...errors,
                password: "",
              });
            }}
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.password}
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);

              setErrors({
                ...errors,
                confirmPassword: "",
              });
            }}
            secureTextEntry
            leftIcon="shield-checkmark-outline"
            error={errors.confirmPassword}
          />

          <CustomButton
            title="Create Account"
            loading={loading}
            onPress={handleRegister}
          />

          <View style={styles.footer}>

            <Text
              style={[
                styles.footerText,
                {
                  color: isDark
                    ? "#CCCCCC"
                    : Colors.textSecondary,
                },
              ]}
            >
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  routes.LOGIN
                )
              }
            >

              <Text style={styles.loginText}>
                Login
              </Text>

            </TouchableOpacity>

          </View>

        </View>

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
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 440,
    borderRadius: 24,
    padding: 28,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },

  themeWrapper: {
  position: "absolute",
  top: 25,
  right: 25,
  zIndex: 100,
},

  footer: {
    marginTop: 28,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    flexWrap: "wrap",
  },

  footerText: {
    fontSize: 15,
  },

  loginText: {
    marginLeft: 6,

    color: Colors.primary,

    fontSize: 15,
    fontWeight: "700",
  },
});