import { useState, type ChangeEvent, type FormEvent } from "react";
import type { DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";

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
  onAddExpense: (expense: Expense) => void;
}

export const ExpenseForm = (props: ExpenseFormProps) => {
  const { onAddExpense } = props;
  const [inputData, setInputData] = useState<Expense>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setInputData((prev) => ({ ...prev, date: dateString }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(inputData).some((value) => value === "" || value === 0)) {
      alert("All fields must be filled");
      return;
    }
    onAddExpense(inputData);
    setInputData(initialState);
  };

  // const handleKeyboardEnter = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (event.key === "Enter") handleSubmit();
  // };

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
