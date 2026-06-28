import { StyleSheet } from "react-native";
import Colors from "./colors";

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  subHeading: {
    fontSize: 16,
    color: Colors.subText,
    marginTop: 8,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 4,
  },
});

export default commonStyles;