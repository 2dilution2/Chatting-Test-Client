import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { Main, Form, StyledH1, ColDiv } from '../styles/Login.style';
import { useMutationLogin } from '../hooks/member';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { loginUser, loginStatus } = useMutationLogin();
    const navigate = useNavigate();
  
    const queryClient = useQueryClient();
    const info = queryClient.getQueryData(['info']);
  
    if (info) {
      return <Navigate to="/" />;
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      loginUser({ email, password });
    };
  
    return (
      <Main>
        <Form onSubmit={onSubmit}>
          <StyledH1>로그인</StyledH1>
          <ColDiv>
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ColDiv>
          <ColDiv>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ColDiv>
          <ColDiv>
            <Button type="submit" disabled={loginStatus === 'loading'}>
              로그인
            </Button>
            <Button type="button" color="secondary" onClick={() => navigate('/sign-up')}>
              회원가입
            </Button>
          </ColDiv>
        </Form>
      </Main>
    );
  }
  
  export default Login;
