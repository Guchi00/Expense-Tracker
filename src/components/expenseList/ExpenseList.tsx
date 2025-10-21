import { Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Expense } from "../expenseForm/ExpenseForm";
import * as S from "./ExpenseList.styles";

interface ExpenseDataProps {
  expenseData: Expense[];
  handleDelete: (id: string) => void;
  handleUpdate: (expense: Expense) => void;
  handleEditClick: (expense: Expense) => void;
}

export const ExpenseList = (props: ExpenseDataProps) => {
  const { expenseData, handleDelete, handleEditClick } = props;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount (#)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Expense) => (
        <Space size="middle">
          <a onClick={() => handleEditClick(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record.id!)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <S.List>
      <h3>Expenses</h3>
      <Table<Expense>
        columns={columns}
        dataSource={expenseData}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
    </S.List>
  );
};
