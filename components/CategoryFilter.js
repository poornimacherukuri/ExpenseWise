import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../styles/colors";

const categories = [
  "All",
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
];

export default function CategoryFilter({
  selected,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.button,
            selected === category && styles.active,
          ]}
          onPress={() => onSelect(category)}
        >
          <Text
            style={[
              styles.text,
              selected === category && styles.activeText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    marginBottom: 8,
  },

  active: {
    backgroundColor: Colors.primary,
  },

  text: {
    color: "#333",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});