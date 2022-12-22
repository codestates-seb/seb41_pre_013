import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import img from "../images/stack.PNG";

const DirectionStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #f1f2f4;
    
`;

const LoginStyle = styled.div`
        width: 280px;
        height: 250px;
        background-color: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 1px 1px 8px 2px lightgray;
        .text {
            padding: 2px;
            margin-bottom: 4px;
            font-weight: 600;
            font-size: 15px;
        }`;

const Input = styled.input`
    width: 100%;
    padding: 7px 0;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #c0c3c4;
`;

const Button = styled.button`
    background-color: #0A95FF;
    width: 100%;
    height: 38px;
    margin-top: 8px;
    border-radius: 4px;
    color: white;
    font-size: 13px;
    .log {
      margin-bottom: 4px;
    }
`;

const MenuStyle = styled.div`
    img {
        display: block;
        margin: auto;
        width: 50px;
        margin-bottom: 15px;
        margin-top: -150px;
    }
    svg {
        font-size: 20px;
        margin-right: 4px;
    }
    .first {
      background-color: #ffffff;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .second {
      background-color: #2f3237;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .third {
      background-color: #375498;
      margin-bottom: 20px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
`;

const MenuButton = styled.button`
    display: block;
    width: 280px;
    height: 38px;
    border: 1px solid #d9dcdf;
    margin: 10px 0;
    border-radius: 4px;
`;

const LoginPage = () => { 
    return (
        <>      
        <DirectionStyle>
        <MenuStyle>
        <img src={img} alt="stack" />
          <MenuButton className="first"><FcGoogle />Log in with Goole</MenuButton>
          <MenuButton className="second"><VscGithub />Log in with GitHub</MenuButton>
          <MenuButton className="third"><AiFillFacebook />Log in with Facebook</MenuButton>
        </MenuStyle>

        <LoginStyle>
            <div className="text">Email</div>
            <Input type="email" />
            <div className="text">Password</div>
            <Input type="password" />
        <Button><div className="log">Log in</div></Button>
        </LoginStyle>
        </DirectionStyle>
        </>
    )
}

export default LoginPage;