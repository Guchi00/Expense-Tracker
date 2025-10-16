import styled from "styled-components";

export const Parent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 900px;
  /* height: 900px; */
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(254, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.header`
  height: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: rgb(62, 178, 85);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 50px;
`;

export const Title = styled.h3`
  color: white;
`;

export const FormandChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ListContainer = styled.div``;
