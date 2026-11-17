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
import { App, Modal, Input, InputNumber, Select, DatePicker } from "antd";
import * as S from "./ExpensePage.styles";

const sortExpenses = (expenses: Expense[]): Expense[] => {
  return [...expenses].sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;

    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    return timeB - timeA;
  });
};

export const ExpensesPage = () => {
  const { message } = App.useApp();
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleMonthChange = (date: Dayjs | null) => {
    setSelectedMonth(date);
    if (date) {
      localStorage.setItem("selectedMonth", date.toISOString());
    }
    console.log("Selected month:", date?.format("YYYY-MM"));
  };

  const API_URL = "https://68e8e709f2707e6128ccb333.mockapi.io/expenses";

  const handleAddExpense = async (newExpense: Expense): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newExpense,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`POST failed: ${response.status}`);
      }
      const createdExpense: Expense = await response.json();

      setExpenseData((previous) => sortExpenses([createdExpense, ...previous]));

      message.success("Expense added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding expense:", error);
      message.error("Unable to add expense.");
      return false;
    }
  };

  const getExpenses = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to load expenses (${response.status})`);
      }
      const data: Expense[] = await response.json();
      setExpenseData(sortExpenses(data));
    } catch (error) {
      console.error("Error loading expenses:", error);
      message.error("Unable to load expenses.");
    }
  };

  useEffect(() => {
    getExpenses();
    const storedMonth = localStorage.getItem("selectedMonth");
    if (storedMonth) {
      setSelectedMonth(dayjs(storedMonth));
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://68e8e709f2707e6128ccb333.mockapi.io/expenses/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      await getExpenses();
      message.success("Expense deleted successfully!");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleUpdate = async (updatedExpense: Expense): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/${updatedExpense.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status}`);
      }

      await getExpenses();
      message.success("Expense updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating expense:", error);
      message.error("Unable to update expense.");
      return false;
    }
  };

  const handleEditClick = (record: Expense) => {
    setEditingExpense({ ...record });
  };

  const handleSaveEdit = async () => {
    if (!editingExpense) return;

    if (
      !editingExpense.title.trim() ||
      !editingExpense.category ||
      !editingExpense.date ||
      editingExpense.amount <= 0
    ) {
      message.warning("Please complete all fields.");
      return;
    }

    const success = await handleUpdate(editingExpense);

    if (success) {
      setEditingExpense(null);
    }
  };

  const totalExpenses = expenseData.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const monthlyExpenses = expenseData.filter((expense) => {
    const month = selectedMonth ?? dayjs();

    return (
      dayjs(expense.date).month() === month.month() &&
      dayjs(expense.date).year() === month.year()
    );
  });

  const monthlyTotal = monthlyExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <S.Parent>
      <S.Container>
        <S.Sidebar>
          <S.Brand>
            Fin<span>Track</span>
          </S.Brand>

          <S.NavItem>◫ &nbsp; Dashboard</S.NavItem>
        </S.Sidebar>

        <S.Main>
          <Modal
            title="Edit Expense"
            open={editingExpense !== null}
            onCancel={() => setEditingExpense(null)}
            onOk={handleSaveEdit}
            okText="Save Changes"
            okButtonProps={{
              style: { backgroundColor: "#8068f7" },
            }}
          >
            {editingExpense && (
              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                <div>
                  <p>Title</p>
                  <Input
                    value={editingExpense.title}
                    onChange={(event) =>
                      setEditingExpense({
                        ...editingExpense,
                        title: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <p>Amount</p>
                  <InputNumber
                    style={{ width: "100%" }}
                    min={1}
                    value={editingExpense.amount}
                    onChange={(value) =>
                      setEditingExpense({
                        ...editingExpense,
                        amount: value ?? 0,
                      })
                    }
                  />
                </div>

                <div>
                  <p>Category</p>
                  <Select
                    style={{ width: "100%" }}
                    value={editingExpense.category}
                    options={[
                      { label: "Food", value: "food" },
                      { label: "Transport", value: "transport" },
                      { label: "Bills", value: "bills" },
                    ]}
                    onChange={(value) =>
                      setEditingExpense({
                        ...editingExpense,
                        category: value,
                      })
                    }
                  />
                </div>

                <div>
                  <p>Date</p>
                  <DatePicker
                    style={{ width: "100%" }}
                    value={
                      editingExpense.date ? dayjs(editingExpense.date) : null
                    }
                    onChange={(_, dateString) =>
                      setEditingExpense({
                        ...editingExpense,
                        date: Array.isArray(dateString)
                          ? dateString[0]
                          : dateString,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </Modal>
          <S.Header>
            <div>
              <S.Title>Expense Dashboard</S.Title>
              <S.Subtitle>
                Track your spending and manage your expenses.
              </S.Subtitle>
            </div>

            <MonthPicker MonthChange={handleMonthChange} />
          </S.Header>

          <S.SummaryGrid>
            <S.SummaryCard>
              <p>Total expenses</p>
              <h2>{formatAmount(totalExpenses)}</h2>
            </S.SummaryCard>

            <S.SummaryCard>
              <p>
                {selectedMonth
                  ? selectedMonth.format("MMMM YYYY")
                  : "This month's expenses"}
              </p>
              <h2>{formatAmount(monthlyTotal)}</h2>
            </S.SummaryCard>

            <S.SummaryCard>
              <p>Total transactions</p>
              <h2>{expenseData.length}</h2>
            </S.SummaryCard>
          </S.SummaryGrid>

          <S.FormandChartContainer>
            <S.Panel>
              <S.PanelTitle>Add new expense</S.PanelTitle>
              <ExpenseForm onAddExpense={handleAddExpense} />
            </S.Panel>

            <S.Panel>
              <S.PanelTitle>Spending by category</S.PanelTitle>
              <ExpenseChart
                expenseData={expenseData}
                selectedMonth={selectedMonth}
              />
            </S.Panel>
          </S.FormandChartContainer>

          <S.ListContainer>
            <ExpenseList
              expenseData={expenseData}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleEditClick={handleEditClick}
            />
          </S.ListContainer>
        </S.Main>
      </S.Container>
    </S.Parent>
  );
};
