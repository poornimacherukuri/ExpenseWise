import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import HomeHeader from "../../components/HomeHeader";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

import { ThemeContext } from "../../context/ThemeContext";
import { changePassword } from "../../services/authService";

import Colors from "../../styles/colors";

export default function ChangePasswordScreen({
  navigation,
}) {
  const { isDark } = useContext(ThemeContext);

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChangePassword =
    async () => {
      if (
        !oldPassword ||
        !newPassword ||
        !confirmPassword
      ) {
        Alert.alert(
          "Validation",
          "Please fill all fields."
        );
        return;
      }

      if (newPassword.length < 6) {
        Alert.alert(
          "Validation",
          "Password should contain at least 6 characters."
        );
        return;
      }

      if (
        newPassword !== confirmPassword
      ) {
        Alert.alert(
          "Validation",
          "Passwords do not match."
        );
        return;
      }

      setLoading(true);

      const result =
        await changePassword(
          oldPassword,
          newPassword
        );

      setLoading(false);

      if (!result.success) {
        Alert.alert(
          "Error",
          result.message
        );
        return;
      }

      Alert.alert(
        "Success",
        "Password updated successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkBackground
            : Colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <HomeHeader
          title="Change Password"
        />

        <CustomInput
          label="Current Password"
          placeholder="Enter current password"
          value={oldPassword}
          onChangeText={
            setOldPassword
          }
          secureTextEntry
          leftIcon="lock-closed-outline"
        />

        <CustomInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={
            setNewPassword
          }
          secureTextEntry
          leftIcon="key-outline"
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={
            setConfirmPassword
          }
          secureTextEntry
          leftIcon="shield-checkmark-outline"
        />

        <CustomButton
          title="Update Password"
          loading={loading}
          onPress={
            handleChangePassword
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
    },

    content: {
      padding: 20,
      paddingBottom: 40,
    },
  });