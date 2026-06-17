import styled, {useTheme} from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui";
import { Input, Field, Label } from '../screens/SignUpScreen';
import { logIn } from "../utils/auth";
import { userStore } from "../stores/userStore";

const LoginContainer = styled.div`
  width: 540px;
  height: 438px;
  background-color: ${props => props.theme.color.card};
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0 1 3 0 rgba(15, 23, 42, 0.05);
  border-radius: 14px;
  padding: 30px;
  box-sizing: border-box;
`;

function LoginModal() {
  const theme = useTheme();
  const auth = userStore((state) => state.signUp);
  const navigate = useNavigate();
  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password);
    const res = await logIn(email, password);
    console.log(res);
    auth(res['user']['email'], res['user']['nickname'], res['token'], res['user']['wallet_address']);
    navigate('/events')
  }

  return (
    <LoginContainer>
      <span style={{fontSize: 20, fontWeight: 600, color: theme.color.ink}}>로그인</span>
      <form style={{marginTop: 42}} onSubmit={onSubmit}>
        <Field>
          <Label>이메일</Label>
          <Input name='email'/>
        </Field>
        <Field style={{marginTop: 20}}>
          <Label>비밀번호</Label>
          <Input name='password'/>
        </Field>
        <Button style={{width: '100%', marginTop: 36, marginBottom: 20}}>로그인</Button>
        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>회원이 아니신가요? <Link to='/signup' style={{color: theme.color.accent, fontWeight: 700}}>회원가입</Link></span>
      </form>
    </LoginContainer>
  )
}

export default LoginModal;