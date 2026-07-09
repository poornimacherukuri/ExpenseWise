import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HomeHeader from "../../components/HomeHeader";
import ExpenseCard from "../../components/ExpenseCard";
import SearchBar from "../../components/SearchBar";
import CategoryFilter from "../../components/CategoryFilter";

import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";

import { getCurrentUser } from "../../services/authService";

import Colors from "../../styles/colors";
import routes from "../../constants/routes";

const HomeScreen = ({ navigation }) => {
  const { expenses } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Hidden by default
  const [showBalance, setShowBalance] =
    useState(false);

  const [monthlyIncome, setMonthlyIncome] =
    useState(0);

  const categories = [
    "All",
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Salary",
    "Health",
    "Others",
  ];

  const loadUserIncome = useCallback(async () => {
    const user = await getCurrentUser();

    if (!user) return;

    const income =
      Number(user.income) || 0;

    setMonthlyIncome(income);

    // First time user
    if (income === 0 && expenses.length === 0) {
      Alert.alert(
        "Welcome 👋",
        "Please set your monthly income before using ExpenseWise.",
        [
          {
            text: "Set Income",
            onPress: () =>
              navigation.navigate(
                routes.PROFILE
              ),
          },
        ]
      );
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadUserIncome();
    }, [loadUserIncome])
  );

  const totalIncome = useMemo(() => {
    return expenses
      .filter(
        (item) => item.type === "Income"
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );
  }, [expenses]);

  const totalExpense = useMemo(() => {
    return expenses
      .filter(
        (item) =>
          item.type === "Expense"
      )
      .reduce(
        (sum, item) =>
          sum + Number(item.amount),
        0
      );
  }, [expenses]);

  // Actual balance
  const totalBalance = useMemo(() => {
    return (
      monthlyIncome +
      totalIncome -
      totalExpense
    );
  }, [
    monthlyIncome,
    totalIncome,
    totalExpense,
  ]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category ===
          selectedCategory;

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    expenses,
    searchText,
    selectedCategory,
  ]);

  return (
    <SafeAreaView
  style={[
    styles.container,
    {
      backgroundColor: isDark
        ? Colors.darkBackground
        : Colors.background,
    },
  ]}
>
  <StatusBar
    barStyle={
      isDark
        ? "light-content"
        : "dark-content"
    }
  />

  <HomeHeader title="ExpenseWise" />

  <View style={styles.balanceCard}>
    <View style={styles.balanceHeader}>
      <Text style={styles.balanceTitle}>
        Total Balance
      </Text>

      <TouchableOpacity
        onPress={() =>
          setShowBalance(!showBalance)
        }
      >
        <Ionicons
          name={
            showBalance
              ? "eye-outline"
              : "eye-off-outline"
          }
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>

    <Text style={styles.balanceAmount}>
      {monthlyIncome === 0
        ? "Not Set"
        : showBalance
        ? `₹ ${totalBalance}`
        : "••••••"}
    </Text>

    <View style={styles.summaryContainer}>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>
          Monthly{"\n"}Income
        </Text>

        <Text style={styles.income}>
          {monthlyIncome === 0
            ? "Not Set"
            : showBalance
            ? `₹ ${monthlyIncome}`
            : "••••••"}
        </Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>
          Income{"\n"}Received
        </Text>

        <Text style={styles.income}>
          {monthlyIncome === 0
            ? "--"
            : showBalance
            ? `₹ ${totalIncome}`
            : "••••••"}
        </Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>
          Total{"\n"}Expense
        </Text>

        <Text style={styles.expense}>
          {monthlyIncome === 0
            ? "--"
            : showBalance
            ? `₹ ${totalExpense}`
            : "••••••"}
        </Text>
      </View>
    </View>
  </View>

  
  <View style={styles.filterSection}>
  <SearchBar
    value={searchText}
    onChangeText={setSearchText}
  />

  <CategoryFilter
    categories={categories}
    selectedCategory={selectedCategory}
    onSelect={setSelectedCategory}
  />
</View>

{monthlyIncome > 0 ? (
  <>

    <Text
      style={[
        styles.recentTitle,
        {
          color: isDark
            ? Colors.white
            : Colors.textPrimary,
        },
      ]}
    >
      Recent Transactions
    </Text>

    <FlatList
      data={filteredExpenses}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
  filteredExpenses.length === 0
    ? styles.emptyContainer
    : styles.listContainer
}
      renderItem={({ item }) => (
        <ExpenseCard
          expense={item}
          navigation={navigation}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyView}>
          <Text
            style={[
              styles.emptyTitle,
              {
                color: isDark
                  ? Colors.white
                  : Colors.textPrimary,
              },
            ]}
          >
            No Transactions Yet
          </Text>

          <Text
            style={[
              styles.emptySubtitle,
              {
                color: isDark
                  ? "#BDBDBD"
                  : "#666666",
              },
            ]}
          >
            Tap the + button to add your first transaction.
          </Text>
        </View>
      }
    />
  </>
) : (
  <View
    style={[
      styles.welcomeCard,
      {
        backgroundColor: isDark
          ? Colors.darkCard
          : Colors.white,
      },
    ]}
  >
    <Text
      style={[
        styles.welcomeTitle,
        {
          color: isDark
            ? Colors.white
            : Colors.textPrimary,
        },
      ]}
    >
      👋 Welcome to ExpenseWise
    </Text>

    <Text
      style={[
        styles.welcomeSubtitle,
        {
          color: isDark
            ? "#BDBDBD"
            : "#666666",
        },
      ]}
    >
      Before you start tracking your finances,
      please set your monthly income from the
      Profile screen.
    </Text>

    <TouchableOpacity
      style={styles.setIncomeButton}
      onPress={() =>
        navigation.navigate(routes.PROFILE)
      }
    >
      <Text style={styles.setIncomeText}>
        Set Monthly Income
      </Text>
    </TouchableOpacity>
  </View>
)}

<TouchableOpacity
  style={styles.fab}
  activeOpacity={0.8}
  onPress={() => {
    if (monthlyIncome === 0) {
      Alert.alert(
        "Monthly Income Required",
        "Please set your monthly income from the Profile page first."
      );
      return;
    }

    navigation.navigate(routes.ADD_EXPENSE);
  }}
>
  <Text style={styles.fabText}>＋</Text>
</TouchableOpacity>

</SafeAreaView>
);
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  balanceCard: {
    margin: 15,
    padding: 20,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    elevation: 5,
  },

  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
  },

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  summaryBox: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  summaryLabel: {
    color: "#DDDDDD",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },

  income: {
    color: "#4ADE80",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 6,
    textAlign: "center",
  },

  filterSection: {
  paddingBottom: 12,
  backgroundColor: "transparent",
},

  expense: {
    color: "#F87171",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 6,
    textAlign: "center",
  },

  recentTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 12,
  },

  listContainer: {
  paddingHorizontal: 15,
  paddingBottom: 100,
  flexGrow: 0,
},

  emptyContainer: {
  paddingTop: 60,
  paddingBottom: 80,
},

  emptyView: {
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 25,
  paddingVertical: 60,
},

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  emptySubtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    color: "#666666",
  },

  fab: {
    position: "absolute",
    right: 25,
    bottom: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  fabText: {
    color: "#FFFFFF",
    fontSize: 34,
    marginTop: -2,
  },

  welcomeCard: {
    marginHorizontal: 20,
    marginTop: 30,
    padding: 25,
    borderRadius: 18,
    elevation: 4,
    alignItems: "center",
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  welcomeSubtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 25,
  },

  setIncomeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 3,
  },

  setIncomeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});