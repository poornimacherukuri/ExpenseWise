import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import CustomButton from "../../components/CustomButton";

import { ThemeContext } from "../../context/ThemeContext";

import {
  getCurrentUser,
  logout,
  updateIncome,
} from "../../services/authService";

import Colors from "../../styles/colors";
import routes from "../../constants/routes";

export default function ProfileScreen({ navigation }) {
  const { isDark } = useContext(ThemeContext);

  const [user, setUser] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [income, setIncome] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handleUpdateIncome = async () => {
    if (!income.trim()) {
      Alert.alert(
        "Error",
        "Please enter your monthly income."
      );
      return;
    }

    await updateIncome(Number(income));

    setModalVisible(false);

    setIncome("");

    await loadUser();

    Alert.alert(
      "Success",
      "Income updated successfully."
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();

            navigation.replace(routes.LOGIN);
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: isDark
              ? Colors.darkBackground
              : Colors.background,
          },
        ]}
      >
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
          <Text
            style={[
              styles.title,
              {
                color: isDark
                  ? Colors.white
                  : Colors.text,
              },
            ]}
          >
            My Profile
          </Text>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={48}
              color="#FFFFFF"
            />
          </View>

          <Text
            style={[
              styles.name,
              {
                color: isDark
                  ? Colors.white
                  : Colors.text,
              },
            ]}
          >
            {user?.name}
          </Text>

          <Text
            style={[
              styles.email,
              {
                color: isDark
                  ? "#BDBDBD"
                  : "#6B7280",
              },
            ]}
          >
            {user?.email}
          </Text>

          <View
            style={[
              styles.infoBox,
              {
                backgroundColor: isDark
                  ? "#1F2937"
                  : "#F3F4F6",
              },
            ]}
          >
            <Text
              style={[
                styles.infoTitle,
                {
                  color: isDark
                    ? "#D1D5DB"
                    : "#666666",
                },
              ]}
            >
              Monthly Income
            </Text>

            <Text style={styles.infoValue}>
              {user?.income > 0
                ? `₹ ${user.income}`
                : "Not Set"}
            </Text>

            <TouchableOpacity
              style={styles.editIncomeButton}
              onPress={() => {
                setIncome(
                  user?.income
                    ? String(user.income)
                    : ""
                );

                setModalVisible(true);
              }}
            >
              <Text
                style={styles.editIncomeText}
              >
                {user?.income > 0
                  ? "Edit Income"
                  : "Set Income"}
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="✏️  Edit Profile"
            onPress={() =>
              navigation.navigate(
                routes.EDIT_PROFILE
              )
            }
          />

          <CustomButton
            title="🔒  Change Password"
            onPress={() =>
              navigation.navigate(
                routes.CHANGE_PASSWORD
              )
            }
          />

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>
              🚪 Logout
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.version,
              {
                color: isDark
                  ? "#888888"
                  : "#9CA3AF",
              },
            ]}
          >
            ExpenseWise v1.0.0
          </Text>

          <Text
            style={[
              styles.developer,
              {
                color: isDark
                  ? "#666666"
                  : "#BDBDBD",
              },
            ]}
          >
            Built with React Native
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: isDark
                  ? Colors.darkCard
                  : "#FFFFFF",
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  color: isDark
                    ? "#FFFFFF"
                    : "#000000",
                },
              ]}
            >
              Monthly Income
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isDark
                    ? "#1F2937"
                    : "#FFFFFF",
                  color: isDark
                    ? "#FFFFFF"
                    : "#000000",
                  borderColor: isDark
                    ? "#374151"
                    : "#CCCCCC",
                },
              ]}
              value={income}
              onChangeText={setIncome}
              keyboardType="numeric"
              placeholder="Enter your monthly income"
              placeholderTextColor={
                isDark
                  ? "#9CA3AF"
                  : "#888888"
              }
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdateIncome}
            >
              <Text
                style={styles.saveButtonText}
              >
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  card: {
    margin: 20,
    borderRadius: 22,
    padding: 25,
    elevation: 6,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 28,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    elevation: 5,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
  },

  email: {
    marginTop: 8,
    marginBottom: 30,
    fontSize: 15,
  },

  infoBox: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    elevation: 3,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  infoValue: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  editIncomeButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  editIncomeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  logoutButton: {
    width: "100%",
    backgroundColor: "#EF4444",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 18,
    elevation: 3,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  version: {
    marginTop: 35,
    fontSize: 14,
    fontWeight: "600",
  },

  developer: {
    marginTop: 6,
    marginBottom: 15,
    fontSize: 13,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 22,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelText: {
    marginTop: 18,
    textAlign: "center",
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 15,
  },
});