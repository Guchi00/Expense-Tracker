import styled from "styled-components";

export const Parent = styled.div`
  min-height: 100vh;
  padding: 40px 24px;
  background: #e9e5ff;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  min-width: 0;
  display: flex;
  overflow: hidden;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(72, 56, 145, 0.12);

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 18px;
  }
`;

export const Sidebar = styled.aside`
  width: 210px;
  flex-shrink: 0;
  padding: 30px 20px;
  background: #f7f5ff;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const Brand = styled.h2`
  font-size: 23px;
  font-weight: 800;
  color: #25223c;
  margin-bottom: 42px;

  span {
    color: #8068f7;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const NavItem = styled.div`
  padding: 13px 16px;
  border-radius: 12px;
  background: #8068f7;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 32px 28px;

  @media (max-width: 768px) {
    padding: 20px 14px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 750;
  color: #24213a;
`;

export const Subtitle = styled.p`
  margin-top: 6px;
  color: #9994aa;
  font-size: 13px;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 22px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  padding: 22px;
  border: 1px solid #eeeaf6;
  border-radius: 18px;
  background: #ffffff;

  p {
    font-size: 13px;
    color: #77728a;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 25px;
    color: #24213a;
    overflow-wrap: anywhere;
  }
`;

export const FormandChartContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 22px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  min-width: 0;
  padding: 22px;
  border: 1px solid #eeeaf6;
  border-radius: 18px;
  background: #ffffff;
`;

export const PanelTitle = styled.h3`
  margin-bottom: 12px;
  color: #24213a;
  font-size: 17px;
`;

export const ListContainer = styled.section`
  min-width: 0;
  padding: 22px;
  border: 1px solid #eeeaf6;
  border-radius: 18px;
  overflow-x: auto;
`;
