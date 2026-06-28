import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../styles/colors";

export default function CustomButton({
  title,
  onPress,
  backgroundColor = Colors.primary,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? Colors.border : backgroundColor,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});