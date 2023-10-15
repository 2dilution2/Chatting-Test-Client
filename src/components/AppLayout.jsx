import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
`;

function AppLayout() {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
}

export default AppLayout;
