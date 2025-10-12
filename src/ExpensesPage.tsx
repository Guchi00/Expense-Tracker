import { useState, useEffect } from "react";
import { ExpenseChart } from "./components/expenseChart/ExpenseChart";
import { ExpenseList } from "./components/expenseList/ExpenseList";
import {
  ExpenseForm,
  type Expense,
} from "./components/expenseForm/ExpenseForm";

import * as S from "./ExpensePage.styles";

export const ExpensesPage = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);

  const handleAddExpense = async (newExpense: Expense) => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExpense),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to create expense");
      }
      const data = await response.json();
      setExpenseData((prev) => [...prev, data]);
      console.log("expense successfully created:", data);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      const data = await response.json();
      setExpenseData(data);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Unable to get comment");
      }
      const update = expenseData.filter((expense) => expense.id !== id);
      setExpenseData(update);
      console.log("expense deleted successfully");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <>
      <S.Parent>
        <S.Container>
          <S.Header>
            <S.Title>Expense Tracker</S.Title>
          </S.Header>
          <S.FormandChartContainer>
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseChart />
          </S.FormandChartContainer>
          <S.ListContainer>
            <ExpenseList
              expenseData={expenseData}
              handleDelete={handleDelete}
            />
          </S.ListContainer>
        </S.Container>
      </S.Parent>
    </>
  );
};
