import React, {
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { PieChart } from "react-native-chart-kit";
import { getCurrentUser } from "../../services/authService";
import HomeHeader from "../../components/HomeHeader";
import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";
import Colors from "../../styles/colors";

const screenWidth = Dimensions.get("window").width;

export default function StatisticsScreen() {
  const { expenses } = useContext(ExpenseContext);
  const { isDark } = useContext(ThemeContext);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

useEffect(() => {
  loadUser();
}, []);

const loadUser = async () => {
  const user = await getCurrentUser();

  if (user) {
    setMonthlyIncome(Number(user.income || 0));
  }
};
  const stats = useMemo(() => {
  let income = 0;
  let expense = 0;

  const categories = {};

  expenses.forEach((item) => {
    const amount = Number(item.amount);

    if (item.type === "Income") {
      income += amount;
    } else {
      expense += amount;

      categories[item.category] =
        (categories[item.category] || 0) + amount;
    }
  });

  const colors = [
    "#4F46E5",
    "#22C55E",
    "#EF4444",
    "#F59E0B",
    "#06B6D4",
    "#8B5CF6",
    "#EC4899",
  ];

  const chartData = Object.entries(categories).map(
    ([name, amount], index) => ({
      name,
      amount,
      color: colors[index % colors.length],
      legendFontColor: isDark ? "#FFFFFF" : "#333333",
      legendFontSize: 14,
    })
  );

  return {
    income,
    expense,
    totalIncome: monthlyIncome + income,
    balance: monthlyIncome + income - expense,
    categories,
    chartData,
  };
}, [expenses, isDark, monthlyIncome]);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? Colors.darkBackground
            : Colors.background,
        },
      ]}
    >
      <HomeHeader title="Statistics" />

      <View style={styles.content}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? Colors.darkCard
                : Colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: isDark
                  ? "#CCCCCC"
                  : "#666666",
              },
            ]}
          >
            Total Income
          </Text>

          <Text
            style={[
              styles.amount,
              { color: "#22C55E" },
            ]}
          >
            ₹ {stats.totalIncome}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? Colors.darkCard
                : Colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: isDark
                  ? "#CCCCCC"
                  : "#666666",
              },
            ]}
          >
            Total Expense
          </Text>

          <Text
            style={[
              styles.amount,
              { color: "#EF4444" },
            ]}
          >
            ₹ {stats.expense}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark
                ? Colors.darkCard
                : Colors.white,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                color: isDark
                  ? "#CCCCCC"
                  : "#666666",
              },
            ]}
          >
            Remaining Balance
          </Text>

          <Text
            style={[
              styles.amount,
              {
                color:
                  stats.balance >= 0
                    ? "#22C55E"
                    : "#EF4444",
              },
            ]}
          >
            ₹ {stats.balance}
          </Text>
        </View>

        <Text
          style={[
            styles.heading,
            {
              color: isDark
                ? Colors.white
                : Colors.textPrimary,
            },
          ]}
        >
          Expense Distribution
        </Text>

        {stats.chartData.length > 0 ? (
          <PieChart
  data={stats.chartData}
  width={screenWidth - 40}
  height={200}
  hasLegend={true}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            chartConfig={{
              color: () => "#000000",
            }}
          />
        ) : (
          <Text
            style={[
              styles.empty,
              {
                color: isDark
                  ? "#BBBBBB"
                  : "#666666",
              },
            ]}
          >
            No expenses yet.

Start adding expenses to view your spending insights.
          </Text>
        )}
<View
  style={{
    height: 1,
    backgroundColor: isDark ? "#333" : "#E5E7EB",
    marginVertical: 25,
  }}
/>
        <Text
          style={[
            styles.heading,
            {
              color: isDark
                ? Colors.white
                : Colors.textPrimary,
            },
          ]}
        >
          Category-wise Spending
        </Text>

        {Object.keys(stats.categories).length === 0 ? (
          <Text
            style={[
              styles.empty,
              {
                color: isDark
                  ? "#BBBBBB"
                  : "#666666",
              },
            ]}
          >
            No expenses available.
          </Text>
        ) : (
          Object.entries(stats.categories).map(
            ([category, amount]) => (
              <View
                key={category}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: isDark
                      ? Colors.darkCard
                      : Colors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: isDark
                        ? Colors.white
                        : Colors.textPrimary,
                    },
                  ]}
                >
                  {category}
                </Text>

                <Text style={styles.categoryAmount}>
                  ₹ {amount}
                </Text>
              </View>
            )
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
  paddingVertical: 18,
  paddingHorizontal: 20,
  borderRadius: 18,
  marginBottom: 16,
  elevation: 4,
},

  cardTitle: {
    fontSize: 15,
  },

  amount: {
  marginTop: 8,
  fontSize: 24,
  fontWeight: "700",
},

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },

  categoryCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  paddingVertical: 15,
  paddingHorizontal: 18,

  borderRadius: 16,

  marginBottom: 12,

  elevation: 3,
},

  categoryName: {
    fontSize: 16,
    fontWeight: "600",
  },

  categoryAmount: {
  fontSize: 18,
  fontWeight: "700",
  color: Colors.primary,
},

  empty: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
  },
});