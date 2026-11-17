import { useState, type ChangeEvent, type FormEvent } from "react";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { App } from "antd";
import * as S from "./ExpenseForm.styles";

const { Option } = S.StyledSelect;

export interface Expense {
  id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt?: string;
}

const initialState: Expense = {
  title: "",
  amount: 0,
  category: "",
  date: "",
};

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => Promise<boolean>;
}

export const ExpenseForm = (props: ExpenseFormProps) => {
  const { message } = App.useApp();
  const { onAddExpense } = props;
  const [inputData, setInputData] = useState<Expense>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    setInputData((prev) => ({
      ...prev,
      date: Array.isArray(dateString) ? dateString[0] : dateString,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (
      !inputData.title.trim() ||
      !inputData.category ||
      !inputData.date ||
      !Number.isFinite(inputData.amount) ||
      inputData.amount <= 0
    ) {
      message.warning("Please complete all fields correctly.");
      return;
    }

    const success = await onAddExpense(inputData);

    if (success) {
      setInputData(initialState);
    }
  };

  return (
    <S.ExpenseForm>
      <S.Form onSubmit={handleSubmit}>
        <h3>Add Expense</h3>
        <div>
          <h5>Title</h5>
          <S.StyledInput
            placeholder="Title"
            type="text"
            name="title"
            value={inputData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <h5>Amount</h5>
          <S.StyledInput
            placeholder="0"
            type="number"
            name="amount"
            value={inputData.amount}
            onChange={handleChange}
          />
        </div>

        <div>
          <h5>Category</h5>
          <S.StyledSelect
            placeholder="Select Category"
            value={inputData.category}
            onChange={(value) =>
              setInputData((prev) => ({ ...prev, category: value }))
            }
          >
            <Option value="food">Food</Option>
            <Option value="transport">Transport</Option>
            <Option value="bills">Bills</Option>
          </S.StyledSelect>
        </div>

        <div>
          <h5>Date</h5>
          <S.StyledDatePicker
            placeholder="Select Date"
            value={inputData.date ? dayjs(inputData.date) : null}
            onChange={handleDateChange}
          />
        </div>

        <div>
          {" "}
          <button type="submit">Add</button>
        </div>
      </S.Form>
    </S.ExpenseForm>
  );
};
