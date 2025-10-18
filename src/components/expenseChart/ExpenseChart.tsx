/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Expense } from "../expenseForm/ExpenseForm";

import * as S from "./ExpenseChart.styles";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
export interface ExpenseChartProps {
  expenseData: Expense[];
  selectedMonth: Dayjs | null;
}

const COLORS = ["#3088ff", "#3eb255", "#fa8f37"];

const renderCustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        marginTop: "1rem",
        textAlign: "center",
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{ display: "inline-block", marginRight: 20 }}
        >
          <span
            style={{
              display: "inline-block",
              width: 15,
              height: 15,
              borderRadius: "50%",
              backgroundColor: entry.color,
              marginRight: 6,
            }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export const ExpenseChart = (props: ExpenseChartProps) => {
  const { expenseData, selectedMonth } = props;

  const filteredExpenses =
    selectedMonth === null
      ? expenseData
      : expenseData.filter((expense) =>
          dayjs(expense.date).isSame(selectedMonth, "month")
        );

  const data = Object.values(
    filteredExpenses.reduce<Record<string, { name: string; value: number }>>(
      (acc, expense) => {
        const category = expense.category;
        if (!acc[category]) {
          acc[category] = { name: category, value: 0 };
        }
        acc[category].value += Number(expense.amount);
        return acc;
      },
      {}
    )
  );

  console.table(filteredExpenses);
  console.table(data);

  return (
    <S.Chart>
      <ResponsiveContainer width="100%" height={420}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={60}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </S.Chart>
  );
};
