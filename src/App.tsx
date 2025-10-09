import { ExpenseChart } from "./components/expenseChart/ExpenseChart";
import { ExpenseForm } from "./components/expenseForm/ExpenseForm";
import { ExpenseList } from "./components/expenseList/ExpenseList";
import GlobalStyles from "./GlobalStyles";
import * as S from "./styles";

function App() {
  return (
    <>
      <GlobalStyles />
      <S.Parent>
        <S.Container>
          <S.Header>
            <S.Title>Expense Tracker</S.Title>
          </S.Header>
          <S.FormandChartContainer>
            <ExpenseForm />
            <ExpenseChart />
          </S.FormandChartContainer>
          <S.ListContainer>
            <ExpenseList />
          </S.ListContainer>
        </S.Container>
      </S.Parent>
    </>
  );
}

export default App;
