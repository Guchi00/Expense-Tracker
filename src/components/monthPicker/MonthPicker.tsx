import type { Dayjs } from "dayjs";
import * as S from "./MonthPicker.styles";
interface MonthPickerProps {
  MonthChange: (date: Dayjs | null) => void;
}

export const MonthPicker = (props: MonthPickerProps) => {
  const { MonthChange } = props;
  return (
    <S.StyledMonthPicker
      picker="month"
      placement="bottomRight"
      onChange={(date, _dateString) => MonthChange(date as Dayjs | null)}
    />
  );
};
