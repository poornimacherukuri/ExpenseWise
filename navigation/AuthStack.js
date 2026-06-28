import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Auth/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import AddExpenseScreen from "../screens/Home/AddExpenseScreen";
import BottomTabs from "./BottomTabs";
import EditExpenseScreen from "../screens/Home/EditExpenseScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Home"
        component={BottomTabs}
      />

      <Stack.Screen
  name="AddExpense"
  component={AddExpenseScreen}
/>
      <Stack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
      />
    </Stack.Navigator>
  );
}