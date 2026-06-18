import { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { Overlay } from '../components/Overlay';
import { Button } from '../components/ui';
import { signUp } from '../utils/auth';
import LoginModal from '../components/LoginModal';
import { loginModalStore } from '../stores/loginModalStore';
import { userStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';

export function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const isClicked = loginModalStore((state) => state.isClicked);
  const setIsClicked = loginModalStore((state) => state.setIsClicked);
  const storeUserInfo = userStore((state) => state.signUp);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const nickname = formData.get('password') as string;
    const res = await signUp(email, password, nickname);
    console.log(res);
    storeUserInfo(res.email, res.nickname, res.token, res.wallet_address);
    console.log('회원 정보 저장 완료');
    navigate('/events')
  };

  return (
    <>
      {isClicked? (<Overlay onClick={(e) => {if(e.target === e.currentTarget) setIsClicked(false);}}><LoginModal /></Overlay>) : null}
      <Navbar />
      <Wrap>
      <FormCard onSubmit={handleSubmit}>
        <Title>회원가입</Title>

        <Field>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            name="email"
          />
        </Field>

        <Field>
          <Label>비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            name="password"
          />
        </Field>

        <Field>
          <Label>닉네임</Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete="nickname"
            name="nickname"
          />
        </Field>

        <Button $variant="primary" $full type="submit">
          회원가입
        </Button>
      </FormCard>
    </Wrap>
    </>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.layout.navHeight});
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`;

const FormCard = styled.form`
  background: ${({ theme }) => theme.color.card};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 48px 40px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
`;

export const Input = styled.input`
  height: 50px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 15px;
  color: ${({ theme }) => theme.color.ink};
  background: ${({ theme }) => theme.color.card};
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${({ theme }) => theme.color.accent};
  }
`;
