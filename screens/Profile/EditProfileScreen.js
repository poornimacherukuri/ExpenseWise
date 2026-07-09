import React, { useContext, useEffect, useState } from "react";
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
import {
  getCurrentUser,
  updateUser,
} from "../../services/authService";

import Colors from "../../styles/colors";

export default function EditProfileScreen({
  navigation,
}) {
  const { isDark } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getCurrentUser();

    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert(
        "Validation",
        "Please fill all fields."
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Validation",
        "Please enter a valid email."
      );
      return;
    }

    try {
      setLoading(true);

      await updateUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      });

      setLoading(false);

      Alert.alert(
        "Success",
        "Profile updated successfully.",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setLoading(false);

      Alert.alert(
        "Error",
        "Unable to update profile."
      );
    }
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
          title="Edit Profile"
        />

        <CustomInput
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          leftIcon="person-outline"
          autoCapitalize="words"
        />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          leftIcon="mail-outline"
          keyboardType="email-address"
        />

        <CustomButton
          title="Save Changes"
          loading={loading}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },
});