import { StyleSheet } from "react-native";
import Colors from "./colors";
import Typography from "./typography";
import Spacing from "./spacing";
import Shadows from "./shadows";

const commonStyles = StyleSheet.create({
  // ===========================
  // Screen
  // ===========================

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingVertical: Spacing.screenVertical,
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.screenHorizontal,
    backgroundColor: Colors.background,
  },

  scrollContainer: {
    paddingBottom: 100,
  },

  // ===========================
  // Card
  // ===========================

  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.cardRadius,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },

  elevatedCard: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
    ...Shadows.large,
  },

  // ===========================
  // Typography
  // ===========================

  title: {
    ...Typography.heading2,
    color: Colors.textPrimary,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  sectionTitle: {
    ...Typography.heading4,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  body: {
    ...Typography.body,
    color: Colors.textPrimary,
  },

  caption: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  label: {
    ...Typography.label,
    color: Colors.textPrimary,
    marginBottom: 6,
  },

  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },

  // ===========================
  // Inputs
  // ===========================

  input: {
    height: Spacing.inputHeight,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: Spacing.inputRadius,
    paddingHorizontal: 16,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
  },

  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  inputError: {
    borderColor: Colors.danger,
    borderWidth: 2,
  },

  // ===========================
  // Buttons
  // ===========================

  primaryButton: {
    height: Spacing.buttonHeight,
    borderRadius: Spacing.buttonRadius,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.button,
  },

  secondaryButton: {
    height: Spacing.buttonHeight,
    borderRadius: Spacing.buttonRadius,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },

  secondaryButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },

  // ===========================
  // Rows
  // ===========================

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // ===========================
  // Dashboard Cards
  // ===========================

  summaryCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: Colors.card,
    margin: 6,
    ...Shadows.card,
  },

  summaryAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 8,
  },

  // ===========================
  // Profile
  // ===========================

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  profileCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    ...Shadows.card,
  },

  // ===========================
  // Divider
  // ===========================

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 18,
  },
});

export default commonStyles;