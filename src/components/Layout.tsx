import { Outlet, Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 30px;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #007bff;
  }
`;

export const Layout = () => {
    return (
        <LayoutContainer>
            <Header>
                <Logo to="/carts">Carts Dashboard</Logo>
            </Header>
            <main>
                {/* Outlet рендерит дочерние роуты внутри Layout */}
                <Outlet />
            </main>
        </LayoutContainer>
    );
};
