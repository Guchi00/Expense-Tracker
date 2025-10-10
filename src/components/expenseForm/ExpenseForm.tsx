import * as S from "./ExpenseForm.styles";

const { Option } = S.StyledSelect;

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

export const ExpenseForm = () => {
  return (
    <S.ExpenseForm>
      <S.Form>
        <h3>Add Expense</h3>
        <div>
          <h5>Title</h5>
          <S.StyledInput placeholder="Title" />
        </div>
        <div>
          <h5>Amount</h5>
          <S.StyledInput placeholder="0,00" />
        </div>

        <div>
          <h5>Category</h5>
          <S.StyledSelect placeholder="Select Category">
            <Option value="food">Food</Option>
            <Option value="transport">Transport</Option>
            <Option value="bills">Bills</Option>
          </S.StyledSelect>
        </div>

        <div>
          <h5>Date</h5>
          <S.StyledDatePicker placeholder="Select Date" />
        </div>

        <div>
          {" "}
          <button>Add</button>
        </div>
      </S.Form>
    </S.ExpenseForm>
  );
};
