/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
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
          style={{ display: "inline-block", marginRight: 20, outline: "none" }}
        >
          <span
            style={{
              display: "inline-block",
              width: 15,
              height: 15,
              borderRadius: "50%",
              backgroundColor: entry.color,
              marginRight: 6,
              outline: "none",
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

  const filteredData = expenseData.filter(
    (exp) =>
      dayjs(exp.date).month() === selectedMonth?.month() &&
      dayjs(exp.date).year() === selectedMonth?.year()
  );
  const data = Object.values(
    filteredData.reduce<Record<string, { name: string; value: number }>>(
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

  console.table(filteredData);
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
            {data.map((_, index) => (
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
