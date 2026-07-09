import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AuthHeader from "../../components/AuthHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ThemeToggle from "../../components/ThemeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import { ExpenseContext } from "../../context/ExpenseContext";
import { login } from "../../services/authService";

import {
  validateEmail,
  validatePassword,
} from "../../utils/validators";

import routes from "../../constants/routes";
import Colors from "../../styles/colors";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext);
  const { loadExpenses } = useContext(ExpenseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    return !emailError && !passwordError;
  };

  const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const user = await login(
      email.trim(),
      password
    );

    if (!user) {
      setErrors({
        email: "",
        password: "Invalid email or password",
      });
      return;
    }

    // Load this user's expenses
    await loadExpenses();

    navigation.replace(routes.HOME);

  } catch (error) {
    console.log(error);

    setErrors({
      email: "",
      password: "Unable to login. Please try again.",
    });
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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
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
            title="Welcome Back"
            subtitle="Login to continue managing your expenses"
          />

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);

              if (errors.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }
            }}
            keyboardType="email-address"
            leftIcon="mail-outline"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);

              if (errors.password) {
                setErrors((prev) => ({
                  ...prev,
                  password: "",
                }));
              }
            }}
            secureTextEntry
            leftIcon="lock-closed-outline"
            error={errors.password}
          />

          <TouchableOpacity
  style={styles.forgotContainer}
  onPress={() =>
    navigation.navigate(routes.FORGOT_PASSWORD)
  }
>
  <Text
    style={[
      styles.forgotText,
      {
        color: Colors.primary,
      },
    ]}
  >
    Forgot Password?
  </Text>
</TouchableOpacity>
          <CustomButton
            title="Login"
            onPress={handleLogin}
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
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.REGISTER)
              }
            >
              <Text style={styles.registerText}>
                Register
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
    maxWidth: 430,
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

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: -8,
    marginBottom: 12,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  footerText: {
    fontSize: 15,
  },

  themeWrapper: {
  position: "absolute",
  top: 25,
  right: 25,
  zIndex: 100,
},

  registerText: {
    marginLeft: 6,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },
});