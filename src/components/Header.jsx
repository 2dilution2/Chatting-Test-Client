import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { useMutationLogout } from '../hooks/member';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  margin-bottom: 4rem;
  border-bottom: 3.2px solid var(--color-grey-800);
`;

const RowDiv = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;

  & span {
    font-size: 1.8rem;
  }
`;

function Header() {
  const { logoutUser } = useMutationLogout();

  const queryClient = useQueryClient();
  const info = queryClient.getQueryData(['info']);

  const onClick = () => {
    logoutUser(localStorage.getItem('accessToken'));
  };

  return (
    <StyledHeader>
      <Link to="/">
        <h1>Crew</h1>
      </Link>
      <RowDiv>
        <span>{info.nickname}</span>
        <Button color="secondary" onClick={onClick}>
          로그아웃
        </Button>
      </RowDiv>
    </StyledHeader>
  );
}

export default Header;
