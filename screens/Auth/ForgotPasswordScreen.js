import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import AuthHeader from "../../components/AuthHeader";

import { ThemeContext } from "../../context/ThemeContext";
import { resetPassword } from "../../services/authService";

import Colors from "../../styles/colors";
import routes from "../../constants/routes";

export default function ForgotPasswordScreen({
  navigation,
}) {
  const { isDark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReset = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Validation",
        "Please fill all fields."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation",
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    const result = await resetPassword(
      email,
      password
    );

    setLoading(false);

    if (!result.success) {
      Alert.alert(
        "Reset Failed",
        result.message
      );
      return;
    }

    Alert.alert(
      "Success",
      "Password reset successfully.",
      [
        {
          text: "Login",
          onPress: () =>
            navigation.replace(
              routes.LOGIN
            ),
        },
      ]
    );
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
        contentContainerStyle={
          styles.container
        }
      >
        <AuthHeader
          title="Forgot Password"
          subtitle="Reset your password"
        />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          leftIcon="mail-outline"
        />

        <CustomInput
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon="lock-closed-outline"
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={
            setConfirmPassword
          }
          secureTextEntry
          leftIcon="shield-checkmark-outline"
        />

        <CustomButton
          title="Reset Password"
          loading={loading}
          onPress={handleReset}
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