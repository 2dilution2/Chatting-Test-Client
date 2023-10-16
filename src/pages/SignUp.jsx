import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { Main, Form, ColDiv, StyledH1 } from '../styles/SignUp.style';
import { useMutationSignUp } from '../hooks/member';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigate = useNavigate();

  const { signUpUser, signUpStatus } = useMutationSignUp();

  const queryClient = useQueryClient();
  const info = queryClient.getQueryData(['info']);

  if (info) {
    return <Navigate to="/" />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    signUpUser({ email, nickname, password});
  };

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <StyledH1>회원가입</StyledH1>
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
          <label htmlFor="nickname">닉네임</label>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
          <Button type="submit" disabled={signUpStatus === 'loading'}>
            가입하기
          </Button>
          <Button type="button" color="secondary" onClick={() => navigate('/login')}>
            로그인
          </Button>
        </ColDiv>
      </Form>
    </Main>
  );
}

export default SignUp;
