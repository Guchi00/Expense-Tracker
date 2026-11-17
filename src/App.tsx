import { App as AntdApp } from "antd";
import GlobalStyles from "./GlobalStyles";
import { ExpensesPage } from "./ExpensesPage";

function App() {
  return (
    <AntdApp>
      <GlobalStyles />
      <ExpensesPage />
    </AntdApp>
  );
}

export default App;
