import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../styles/colors";

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search expenses..."
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});