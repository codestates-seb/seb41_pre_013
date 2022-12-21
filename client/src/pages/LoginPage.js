import styled from 'styled-components';
import { BasicButton } from "../components/Button";
import Login from "../components/Login";



const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function LoginPage() {
  return (
        <>
        <Login />
        </>
  );
}

export default LoginPage;