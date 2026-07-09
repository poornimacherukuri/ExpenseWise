import React, { useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { ThemeContext } from "../context/ThemeContext";
import Colors from "../styles/colors";

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((item) => {
        const selected = item === selectedCategory;

        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.button,
              {
                backgroundColor: selected
                  ? "#4F46E5"
                  : isDark
                  ? Colors.darkCard
                  : "#FFFFFF",
              },
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.text,
                {
                  color: selected
                    ? "#FFFFFF"
                    : isDark
                    ? "#FFFFFF"
                    : "#000000",
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
  paddingHorizontal: 15,
  paddingVertical: 8,
  alignItems: "center",
},
  button: {
  height: 42,
  minWidth: 70,

  paddingHorizontal: 20,

  borderRadius: 21,

  marginRight: 10,

  justifyContent: "center",
  alignItems: "center",

  elevation: 2,
},

  text: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});