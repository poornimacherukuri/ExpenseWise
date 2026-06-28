import { SafeAreaView, View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import Colors from "../../styles/colors";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>ExpenseWise</Text>

        <Text style={styles.tagline}>
          Track • Save • Grow
        </Text>
      </View>

      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ marginTop: 20 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: Colors.primary,
  },

  tagline: {
    marginTop: 8,
    fontSize: 18,
    color: Colors.subText,
  },

});