import Colors from "./colors";
import Typography from "./typography";
import Spacing from "./spacing";
import Shadows from "./shadows";

export const LightTheme = {
  dark: false,

  colors: {
    ...Colors,

    background: Colors.background,
    surface: Colors.surface,
    card: Colors.card,

    text: Colors.textPrimary,
    textSecondary: Colors.textSecondary,

    primary: Colors.primary,
    secondary: Colors.secondary,

    border: Colors.border,

    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,

    income: Colors.income,
    expense: Colors.expense,
    balance: Colors.balance,

    inputBackground: Colors.inputBackground,
    inputBorder: Colors.inputBorder,

    shadow: Colors.shadow,
  },

  typography: Typography,
  spacing: Spacing,
  shadows: Shadows,
};

export const DarkTheme = {
  dark: true,

  colors: {
    ...Colors,

    background: Colors.darkBackground,
    surface: Colors.darkSurface,
    card: Colors.darkCard,

    text: "#FFFFFF",
    textSecondary: "#CBD5E1",

    primary: Colors.primary,
    secondary: Colors.secondary,

    border: Colors.borderDark,

    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,

    income: Colors.income,
    expense: Colors.expense,
    balance: "#60A5FA",

    inputBackground: "#334155",
    inputBorder: "#475569",

    shadow: "#000000",
  },

  typography: Typography,
  spacing: Spacing,
  shadows: Shadows,
};

export default LightTheme;