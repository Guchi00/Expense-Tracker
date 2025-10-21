import { useState, useEffect } from "react";
import { ExpenseChart } from "./components/expenseChart/ExpenseChart";
import { ExpenseList } from "./components/expenseList/ExpenseList";
import {
  ExpenseForm,
  type Expense,
} from "./components/expenseForm/ExpenseForm";
import { MonthPicker } from "./components/monthPicker/MonthPicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import * as S from "./ExpensePage.styles";
import { getExpenseFromAPI, getExpenseFromLocalStorage } from "./utils";

export const ExpensesPage = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>(
    JSON.parse(localStorage.getItem("expenses") || "[]")
  );
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);

  const handleMonthChange = (date: Dayjs | null) => {
    setSelectedMonth(date);
    if (date) {
      localStorage.setItem("selectedMonth", date.toISOString());
    }
    console.log("Selected month:", date?.format("YYYY-MM"));
  };

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
      const existing = getExpenseFromLocalStorage();
      localStorage.setItem(
        "expense",
        JSON.stringify([...existing, newExpense])
      );
      const apiExpenses = await getExpenseFromAPI();
      const localStorageExpense = getExpenseFromLocalStorage();
      const merged = [...apiExpenses, ...localStorageExpense];
      merged.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setExpenseData(merged);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses`
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
    const storedMonth = localStorage.getItem("selectedMonth");
    if (storedMonth) {
      setSelectedMonth(dayjs(storedMonth));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenseData));
  }, [expenseData]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      await getExpenses();
      alert("expense deleted successfully");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleUpdate = async (updatedExpense: Expense) => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses/${updatedExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...updatedExpense }),
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      await getExpenses();
      alert("expense updated successfully");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleEditClick = (record: Expense) => {
    const newTitle = window.prompt("Enter new title:", record.title);
    const newAmount = window.prompt(
      "Enter new amount:",
      record.amount.toString()
    );
    const newCategory = window.prompt("Enter new category:", record.category);
    const newDate = window.prompt("Enter new date:", record.date);

    if (
      newTitle === null ||
      newAmount === null ||
      newCategory === null ||
      newDate === null
    )
      return;

    const updatedExpense: Expense = {
      ...record,
      title: newTitle,
      amount: Number(newAmount),
      category: newCategory,
      date: newDate,
    };

    handleUpdate(updatedExpense);
  };

  return (
    <>
      <S.Parent>
        <S.Container>
          <S.Header>
            <S.Title>Expense Tracker</S.Title>
            <MonthPicker MonthChange={handleMonthChange} />
          </S.Header>
          <S.FormandChartContainer>
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseChart
              expenseData={expenseData}
              selectedMonth={selectedMonth}
            />
          </S.FormandChartContainer>
          <S.ListContainer>
            <ExpenseList
              expenseData={expenseData}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleEditClick={handleEditClick}
            />
          </S.ListContainer>
        </S.Container>
      </S.Parent>
    </>
  );
};
