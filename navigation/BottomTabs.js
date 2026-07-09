import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen";
import AddExpenseScreen from "../screens/Home/AddExpenseScreen";
import StatisticsScreen from "../screens/statistics/StatisticsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

import Colors from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#888",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
  iconName = "home";
  break;

            case "Statistics":
              iconName = "stats-chart";
              break;

            case "Add":
              iconName = "add-circle";
              break;

            case "Profile":
              iconName = "person";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
  name="Dashboard"
  component={HomeScreen}
  options={{
    tabBarLabel: "Home",
  }}
/>

      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
      />

      <Tab.Screen
        name="Add"
        component={AddExpenseScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}