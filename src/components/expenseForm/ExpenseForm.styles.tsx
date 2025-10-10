import styled from "styled-components";
import { Select, DatePicker, Input } from "antd";

export const ExpenseForm = styled.div`
  height: 480px;
  width: 330px;
  /* border: solid 1px rgb(232, 232, 232); */
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  height: 430px;
  width: 100%;
  border: solid 1px rgb(232, 232, 232);
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin-bottom: 3px;
  }

  div {
    margin-top: 15px;

    button {
      height: 40px;
      width: 100%;
      margin-top: 2px;
      background-color: rgb(48, 136, 255);
      border-radius: 8px;
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: solid 1px;
      cursor: pointer;
    }
  }
`;

export const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
  outline: none !important;
  margin-top: 8px;
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  outline: none;
  margin-top: 8px !important;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  outline: none;
  margin-top: 8px !important;
  display: flex;
  align-items: center;
  padding-bottom: 18px;
`;
